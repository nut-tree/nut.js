import { NativeAdapter } from "./adapter/native.adapter.class";

export class Clipboard {
  constructor(private nativeAdapter: NativeAdapter) {}

  public copy(text: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.nativeAdapter.copy(text);
      resolve();
    });
  }

  public paste(): Promise<string> {
    return this.nativeAdapter.paste();
  }
}
