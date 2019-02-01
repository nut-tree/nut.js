import clippy from "clipboardy";
import { ClipboardActionProvider } from "./clipboard-action-provider.interface";

export class ClipboardAction implements ClipboardActionProvider {
  constructor() {
  }

  public hasText(): boolean {
    return clippy.readSync().length > 0;
  }

  public clear(): boolean {
    throw new Error("Method not implemented.");
  }

  public copy(text: string) {
    clippy.writeSync(text);
  }

  public paste(): string {
    return clippy.readSync();
  }
}
