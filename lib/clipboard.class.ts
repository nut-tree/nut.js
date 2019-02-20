import { NativeAdapter } from "./adapter/native.adapter.class";

export class Clipboard {
  constructor(private nativeAdapter: NativeAdapter) {}

  public copy(text: string): void {
    this.nativeAdapter.copy(text);
  }

  public paste(): Promise<string> {
    return this.nativeAdapter.paste();
  }
}
