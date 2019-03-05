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

  public type(...input: string[] | Key[]): Promise<Keyboard> {
    return new Promise<Keyboard>(async resolve => {
      if (Keyboard.inputIsString(input)) {
        for (const char of input.join(" ").split("")) {
          await this.waitForNextTick();
          this.nativeAdapter.type(char);
          this.updateTick();
        }
      } else {
        this.nativeAdapter.click(...input as Key[]);
      }
      resolve(this);
    });
  }

  public pressKey(...keys: Key[]): Promise<Keyboard> {
    return new Promise<Keyboard>(async resolve => {
      this.nativeAdapter.pressKey(...keys);
      resolve(this);
    });
  }

  public releaseKey(...keys: Key[]): Promise<Keyboard> {
    return new Promise<Keyboard>(async resolve => {
      this.nativeAdapter.releaseKey(...keys);
      resolve(this);
    });
  }

  private updateTick() {
    this.lastAction = Date.now();
  }

  private async waitForNextTick(): Promise<void> {
    return new Promise<void>(resolve => {
      let current = Date.now();
      while (current - this.lastAction < this.config.autoDelayMs) {
        current = Date.now();
      }
      resolve();
    });
  }
}
