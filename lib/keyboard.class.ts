import { NativeAdapter } from "./adapter/native.adapter.class";
import { Key } from "./key.enum";

export class Keyboard {

  private static keyIsString(input: string | Key): input is string {
    return typeof input === "string";
  }
  public config = {
    autoDelayMs: 20,
  };

  constructor(private nativeAdapter: NativeAdapter) {
    this.nativeAdapter.setKeyboardDelay(this.config.autoDelayMs);
  }

  public type(input: string | Key): Keyboard {
    if (Keyboard.keyIsString(input)) {
      this.nativeAdapter.type(input);
    } else {
      this.nativeAdapter.click(input);
    }
    return this;
  }

  public pressKey(...keys: Key[]): Keyboard {
    this.nativeAdapter.pressKey(...keys);
    return this;
  }

  public releaseKey(...keys: Key[]): Keyboard {
    this.nativeAdapter.releaseKey(...keys);
    return this;
  }
}
