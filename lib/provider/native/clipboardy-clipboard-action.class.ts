import clippy from "clipboardy";
import { ClipboardActionProvider } from "./clipboard-action-provider.interface";

export class ClipboardAction implements ClipboardActionProvider {
  constructor() {
  }

  public hasText(): Promise<boolean> {
    return Promise.resolve(clippy.readSync().length > 0);
  }

  public clear(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public copy(text: string): void {
    clippy.write(text);
  }

  public async paste(): Promise<string> {
    return clippy.read();
  }
}
