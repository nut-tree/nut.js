import { NativeAdapter } from "./adapter/native.adapter.class";
import { Key } from "./key.enum";

export class Keyboard {

  private static inputIsString(input: string[] | Key[]): boolean {
    return input.every((elem: string | Key) => typeof elem === "string");
  }

  public config = {
    autoDelayMs: 500,
  };

  private lastAction: number;

  constructor(private nativeAdapter: NativeAdapter) {
    this.nativeAdapter.setKeyboardDelay(this.config.autoDelayMs);
    this.lastAction = Date.now();
  }

  public type(...input: string[] | Key[]): Keyboard {
    if (Keyboard.inputIsString(input)) {
      for (const char of input.join(" ").split("")) {
        this.waitForNextTick();
        this.nativeAdapter.type(char);
        this.updateTick();
      }
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

  private updateTick() {
    this.lastAction = Date.now();
  }

  private waitForNextTick() {
    let current = Date.now();
    while (current - this.lastAction < this.config.autoDelayMs) {
      current = Date.now();
    }
  }
}
