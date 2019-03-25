import { NativeAdapter } from "./adapter/native.adapter.class";
import { Key } from "./key.enum";

type StringOrKey = string[] | Key[];

const inputIsString = (input: string[] | Key[]): input is string[] => {
  return input.every((elem: string | Key) => typeof elem === "string");
};

export class Keyboard {

  public config = {
    autoDelayMs: 500,
  };

  private lastAction: number;

  constructor(private nativeAdapter: NativeAdapter) {
    this.nativeAdapter.setKeyboardDelay(this.config.autoDelayMs);
    this.lastAction = Date.now();
  }

  public type(...input: StringOrKey): Promise<Keyboard> {
    return new Promise<Keyboard>(async resolve => {
      if (inputIsString(input)) {
        for (const char of input.join(" ").split("")) {
          await this.nextTick();
          await this.nativeAdapter.type(char);
          this.updateTick();
        }
      } else {
        await this.nativeAdapter.click(...input as Key[]);
      }
      resolve(this);
    });
  }

  public pressKey(...keys: Key[]): Promise<Keyboard> {
    return new Promise<Keyboard>(async resolve => {
      await this.nativeAdapter.pressKey(...keys);
      resolve(this);
    });
  }

  public releaseKey(...keys: Key[]): Promise<Keyboard> {
    return new Promise<Keyboard>(async resolve => {
      await this.nativeAdapter.releaseKey(...keys);
      resolve(this);
    });
  }

  private updateTick() {
    this.lastAction = Date.now();
  }

  private async nextTick(): Promise<void> {
    return new Promise<void>(resolve => {
      let current = Date.now();
      while (current - this.lastAction < this.config.autoDelayMs) {
        current = Date.now();
      }
      resolve();
    });
  }
}
