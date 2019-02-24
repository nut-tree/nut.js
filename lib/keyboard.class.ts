import { NativeAdapter } from "./adapter/native.adapter.class";
import { Key } from "./key.enum";

export class Keyboard {

  private static inputIsString(input: string[] | Key[]): boolean {
    return input.every((elem: string | Key) => typeof elem === "string");
  }

  public config = {
    autoDelayMs: 20,
  };

  constructor(private nativeAdapter: NativeAdapter) {
    this.nativeAdapter.setKeyboardDelay(this.config.autoDelayMs);
  }

  public type(...input: string[] | Key[]): Keyboard {
    if (Keyboard.inputIsString(input)) {
      this.nativeAdapter.type(input.join(" "));
    } else {
      this.nativeAdapter.click(...input as Key[]);
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
