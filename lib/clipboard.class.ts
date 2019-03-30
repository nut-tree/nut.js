import { NativeAdapter } from "./adapter/native.adapter.class";

export class Clipboard {
  constructor(private nativeAdapter: NativeAdapter) {
  }

  public copy(text: string): Promise<void> {
    return this.nativeAdapter.copy(text);
  }

  public paste(): Promise<string> {
    return this.nativeAdapter.paste();
  }
}
