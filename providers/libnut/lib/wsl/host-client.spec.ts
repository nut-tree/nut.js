import { ChildProcessWithoutNullStreams } from "child_process";
import { EventEmitter } from "events";
import { PassThrough, Writable } from "stream";
import { commandTimeout, WindowsHostClient } from "./host-client";

jest.mock("fs", () => ({ existsSync: jest.fn(() => true) }));

function peer() {
  const process = new EventEmitter();
  const stdout = new PassThrough();
  const stderr = new PassThrough();
  const requests: { id: number; command: string; args: unknown }[] = [];
  const stdin = new Writable({
    write(chunk, _encoding, callback) {
      const request = JSON.parse(chunk.toString());
      requests.push(request);
      if (request.command === "hello") reply(request.id, { protocol: 1 });
      callback();
    }
  });
  const child = Object.assign(process, { stdin, stdout, stderr }) as unknown as ChildProcessWithoutNullStreams;
  function reply(id: number, result: unknown, pixels = Buffer.alloc(0)) {
    stdout.write(Buffer.concat([Buffer.from(JSON.stringify({ id, result, byteLength: pixels.length }) + "\n"), pixels]));
  }
  return { child, requests, reply };
}

describe("WindowsHostClient", () => {
  const clients: WindowsHostClient[] = [];
  afterEach(() => { for (const client of clients) client.close(); clients.length = 0; jest.useRealTimers(); });

  function setup() {
    const remote = peer();
    const spawn = jest.fn(() => remote.child);
    const client = new WindowsHostClient(() => "/helper.exe", spawn);
    clients.push(client);
    return { ...remote, client, spawn };
  }

  it("starts once, handshakes and serializes commands", async () => {
    const remote = setup();
    const first = remote.client.request("screenSize");
    const second = remote.client.request("cursorPosition");
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
    expect(remote.requests.map(request => request.command)).toEqual(["hello", "screenSize"]);
    remote.reply(2, { width: 100, height: 50 });
    expect((await first).result).toEqual({ width: 100, height: 50 });
    expect(remote.requests[2].command).toBe("cursorPosition");
    remote.reply(3, { x: 4, y: 5 });
    expect((await second).result).toEqual({ x: 4, y: 5 });
    expect(remote.spawn).toHaveBeenCalledTimes(1);
  });

  it("assembles fragmented UTF-8 headers and binary screenshot data", async () => {
    const remote = setup();
    const response = remote.client.request("capture");
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
    const pixels = Buffer.from([10, 0, 255, 255, 13, 10, 0, 255]);
    const packet = Buffer.concat([Buffer.from(JSON.stringify({ id: 2, result: "é", byteLength: pixels.length }) + "\n"), pixels]);
    for (const byte of packet) remote.child.stdout.emit("data", Buffer.from([byte]));
    expect(await response).toEqual({ result: "é", pixels });
  });

  it("reports command errors without repeating the command", async () => {
    const remote = setup();
    const response = remote.client.request("click");
    const rejected = expect(response).rejects.toThrow("input blocked");
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
    remote.child.stdout.emit("data", Buffer.from('{"id":2,"error":"input blocked","byteLength":0}\n'));
    await rejected;
    expect(remote.requests.filter(request => request.command === "click")).toHaveLength(1);
    const next = remote.client.request("screenSize");
    await Promise.resolve();
    remote.reply(3, { width: 100, height: 50 });
    expect((await next).result).toEqual({ width: 100, height: 50 });
    expect(remote.spawn).toHaveBeenCalledTimes(1);
  });

  it.each([
    '{"id":99,"result":null,"byteLength":0}\n',
    '{"id":2,"result":null,"byteLength":-1}\n',
    '{"id":2,"result":null,"byteLength":134217729}\n',
    '{"id":2,"byteLength":0}\n',
    'not JSON\n'
  ])("fails the connection on malformed responses: %s", async packet => {
    const remote = setup();
    const response = remote.client.request("capture");
    const rejected = expect(response).rejects.toBeInstanceOf(Error);
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
    remote.child.stdout.emit("data", Buffer.from(packet));
    await rejected;
    await expect(remote.client.request("capture")).rejects.toBeInstanceOf(Error);
    expect(remote.spawn).toHaveBeenCalledTimes(1);
  });

  it("rejects active and queued requests when the host exits", async () => {
    const remote = setup();
    const first = expect(remote.client.request("click")).rejects.toThrow("not retried");
    const second = expect(remote.client.request("capture")).rejects.toThrow("not retried");
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
    remote.child.emit("close", 1, null);
    await Promise.all([first, second]);
    expect(remote.requests.map(request => request.command)).toEqual(["hello", "click"]);
  });

  it("ends helper input on close", async () => {
    const remote = setup();
    const response = expect(remote.client.request("screenSize")).rejects.toThrow("closed");
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
    remote.client.close();
    await response;
    expect(remote.child.stdin.writableEnded).toBe(true);
  });

  it("does not restart or retry after a timeout", async () => {
    jest.useFakeTimers();
    const remote = setup();
    const response = expect(remote.client.request("click", {}, 10)).rejects.toThrow("may already have occurred");
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
    jest.advanceTimersByTime(10);
    await response;
    await expect(remote.client.request("click")).rejects.toThrow("may already have occurred");
    expect(remote.spawn).toHaveBeenCalledTimes(1);
  });

  it("rejects requests exceeding the protocol limit without writing them", async () => {
    const remote = setup();
    await expect(remote.client.request("type", { text: "a".repeat(1024 * 1024) })).rejects.toThrow("exceeds 1 MiB");
    expect(remote.requests.map(request => request.command)).toEqual(["hello"]);
  });

  it("waits for accepted delays above 30 seconds", async () => {
    jest.useFakeTimers();
    const remote = setup();
    const response = remote.client.request("keys", { keys: ["a"], down: true, delay: 60000 }, commandTimeout(60000));
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
    jest.advanceTimersByTime(60000);
    remote.reply(2, null);
    expect(await response).toEqual({ result: null, pixels: Buffer.alloc(0) });
    expect(remote.child.stdin.writableEnded).toBe(false);
  });

  it.each([0, -1, NaN, Infinity, 1.5, 2147483648, 2400030000])("rejects invalid timeout %s before starting the helper", async timeout => {
    const remote = setup();
    await expect(remote.client.request("type", {}, timeout)).rejects.toThrow("timeout");
    expect(remote.spawn).not.toHaveBeenCalled();
    expect(remote.requests).toHaveLength(0);
  });

  it("accepts the exact maximum timer delay without shortening it", async () => {
    jest.useFakeTimers();
    const remote = setup();
    const response = remote.client.request("screenSize", {}, 2147483647);
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
    jest.advanceTimersByTime(60000);
    remote.reply(2, { width: 100, height: 50 });
    expect((await response).result).toEqual({ width: 100, height: 50 });
  });
});
