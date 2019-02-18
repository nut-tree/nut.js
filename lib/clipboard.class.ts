import { NativeAdapter } from "./adapter/native.adapter.class";

export class Clipboard {
  constructor(private nativeAdapter: NativeAdapter) {}

  public copy(text: string): void {
    this.nativeAdapter.copy(text);
  }

  public paste(): string {
    return this.nativeAdapter.paste();
  }
}
