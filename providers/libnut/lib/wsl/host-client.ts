import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { existsSync } from "fs";
import { dirname, join, resolve } from "path";

const maxRequestBytes = 1024 * 1024;
const maxImageBytes = 128 * 1024 * 1024;
const maxHeaderBytes = 1024 * 1024;
const defaultTimeout = 30000;
const maxTimeout = 2147483647;

export function commandTimeout(duration = 0): number {
  const timeout = defaultTimeout + duration;
  validateTimeout(timeout);
  return timeout;
}

function validateTimeout(timeout: number): void {
  if (!Number.isInteger(timeout) || timeout < 1 || timeout > maxTimeout) {
    throw new Error(`Windows host timeout must be between 1 and ${maxTimeout} ms`);
  }
}

export interface HostResponse<T> {
  result: T;
  pixels: Buffer;
}

interface ResponseHeader {
  id: number;
  result?: unknown;
  error?: string;
  byteLength: number;
}

interface Request {
  id: number;
  data: string;
  timeout: number;
  resolve: (response: HostResponse<unknown>) => void;
  reject: (error: Error) => void;
}

export type HostSpawner = (path: string) => ChildProcessWithoutNullStreams;

export function windowsHelperPath(): string {
  if (process.env.NUT_JS_WSL_HELPER) {
    return resolve(process.env.NUT_JS_WSL_HELPER);
  }
  try {
    return join(dirname(require.resolve("@nut-tree/libnut-win32/package.json")), "build", "Release", "libnut-wsl-host.exe");
  } catch {
    throw new Error("The WSL backend requires @nut-tree/libnut-win32 with its precompiled Windows host. NUT_JS_WSL_HELPER can select a local build.");
  }
}

/** One ordered command stream shared by all five desktop providers. */
export class WindowsHostClient {
  private child?: ChildProcessWithoutNullStreams;
  private ready?: Promise<void>;
  private failure?: Error;
  private queue: Request[] = [];
  private active?: Request;
  private timer?: NodeJS.Timeout;
  private buffer = Buffer.alloc(0);
  private header?: ResponseHeader;
  private pixels?: Buffer;
  private pixelOffset = 0;
  private nextId = 1;
  private stderr = "";

  constructor(
    private readonly helperPath: () => string = windowsHelperPath,
    private readonly startProcess: HostSpawner = (path) => spawn(path, [], { stdio: "pipe", windowsHide: true })
  ) {}

  async request<T>(command: string, args: Record<string, unknown> = {}, timeout = defaultTimeout): Promise<HostResponse<T>> {
    // Validate before starting the helper or sending an action. Node replaces
    // overflowing timer delays with 1 ms, which would fail after input occurs.
    validateTimeout(timeout);
    if (this.failure) throw this.failure;
    if (!this.ready) this.ready = this.start();
    await this.ready;
    return this.exchange(command, args, timeout) as Promise<HostResponse<T>>;
  }

  close = (): void => {
    if (this.failure) return;
    this.stop(new Error("Windows host connection closed"));
  };

  private async start(): Promise<void> {
    try {
      const path = this.helperPath();
      if (!existsSync(path)) throw new Error(`Precompiled Windows host not found: ${path}. Build or upgrade libnut-core; the helper is never compiled at runtime.`);
      const child = this.startProcess(path);
      this.child = child;
      // Idle helpers must not keep otherwise finished nut.js scripts alive.
      // An active request's timeout keeps the event loop alive until its reply.
      child.unref?.();
      for (const stream of [child.stdin, child.stdout, child.stderr]) {
        (stream as typeof stream & { unref?: () => void }).unref?.();
      }
      child.stdout.on("data", (chunk: Buffer) => this.receive(chunk));
      child.stderr.on("data", (chunk: Buffer) => {
        this.stderr = (this.stderr + chunk.toString("utf8")).slice(-4096);
      });
      child.stdin.on("error", (error: Error) => this.stop(error));
      child.stdout.on("error", (error: Error) => this.stop(error));
      child.on("error", (error: Error) => this.stop(new Error(`Cannot start the Windows host. Check that WSL Windows interoperability is enabled: ${error.message}`)));
      child.on("close", (code, signal) => {
        this.stop(new Error(`Windows host exited (${signal ?? code ?? "unknown"})${this.stderr ? `: ${this.stderr.trim()}` : ""}. Commands are not retried because input may already have occurred.`));
        process.removeListener("exit", this.close);
      });
      process.once("exit", this.close);
      const response = await this.exchange("hello", {}, defaultTimeout);
      const result = response.result as { protocol?: unknown } | null;
      if (!result || result.protocol !== 1 || response.pixels.length !== 0) {
        throw new Error("Unsupported Windows host protocol; rebuild matching nut.js and libnut-core sources");
      }
    } catch (error) {
      const failure = error instanceof Error ? error : new Error(String(error));
      this.stop(failure);
      throw failure;
    }
  }

  private exchange(command: string, args: Record<string, unknown>, timeout: number): Promise<HostResponse<unknown>> {
    if (this.failure) return Promise.reject(this.failure);
    const id = this.nextId++;
    const data = JSON.stringify({ id, command, args }) + "\n";
    if (Buffer.byteLength(data) - 1 > maxRequestBytes) return Promise.reject(new Error("Windows host request exceeds 1 MiB"));
    return new Promise((resolve, reject) => {
      this.queue.push({ id, data, timeout, resolve, reject });
      this.sendNext();
    });
  }

  private sendNext(): void {
    if (this.failure || this.active || !this.child) return;
    const request = this.queue.shift();
    if (!request) return;
    this.active = request;
    this.timer = setTimeout(() => this.stop(new Error("Windows host request timed out. Its action may already have occurred; it will not be retried.")), request.timeout);
    this.child.stdin.write(request.data, (error) => { if (error) this.stop(error); });
  }

  private receive(chunk: Buffer): void {
    if (this.failure) return;
    try {
      let offset = 0;
      while (offset < chunk.length) {
        if (!this.header) {
          const newline = chunk.indexOf(10, offset);
          const end = newline === -1 ? chunk.length : newline;
          if (this.buffer.length + end - offset > maxHeaderBytes) throw new Error("Windows host response header exceeds 1 MiB");
          this.buffer = Buffer.concat([this.buffer, chunk.subarray(offset, end)]);
          if (newline === -1) {
            return;
          }
          const header = JSON.parse(this.buffer.toString("utf8")) as ResponseHeader;
          if (!header || !this.active || header.id !== this.active.id ||
              !Number.isSafeInteger(header.byteLength) || header.byteLength < 0 || header.byteLength > maxImageBytes ||
              (header.error !== undefined && typeof header.error !== "string") ||
              (header.error !== undefined ? header.byteLength !== 0 : !("result" in header))) {
            throw new Error("Invalid Windows host response");
          }
          this.header = header;
          this.buffer = Buffer.alloc(0);
          this.pixels = Buffer.allocUnsafe(header.byteLength);
          this.pixelOffset = 0;
          offset = newline + 1;
        }
        const header = this.header;
        const count = Math.min(header.byteLength - this.pixelOffset, chunk.length - offset);
        chunk.copy(this.pixels!, this.pixelOffset, offset, offset + count);
        this.pixelOffset += count;
        offset += count;
        if (this.pixelOffset < header.byteLength) return;
        const request = this.active!;
        const pixels = this.pixels!;
        this.header = undefined;
        this.pixels = undefined;
        this.active = undefined;
        if (this.timer) clearTimeout(this.timer);
        this.timer = undefined;
        if (header.error !== undefined) request.reject(new Error(header.error));
        else request.resolve({ result: header.result, pixels });
        this.sendNext();
      }
    } catch (error) {
      this.stop(error instanceof Error ? error : new Error(String(error)));
    }
  }

  private stop(error: Error): void {
    if (this.failure) return;
    this.failure = error;
    if (this.timer) clearTimeout(this.timer);
    this.timer = undefined;
    this.active?.reject(error);
    this.active = undefined;
    for (const request of this.queue) request.reject(error);
    this.queue = [];
    this.buffer = Buffer.alloc(0);
    this.pixels = undefined;
    // EOF lets the helper release its own held keys/buttons before exiting.
    this.child?.stdin.end();
    process.removeListener("exit", this.close);
  }
}
