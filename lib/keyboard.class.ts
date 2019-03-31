import { NativeAdapter } from "./adapter/native.adapter.class";
import { Key } from "./key.enum";
import { sleep } from "./sleep.function";

type StringOrKey = string[] | Key[];

const inputIsString = (input: string[] | Key[]): input is string[] => {
  return input.every((elem: string | Key) => typeof elem === "string");
};

export class Keyboard {

  public config = {
    autoDelayMs: 300,
  };

  constructor(private nativeAdapter: NativeAdapter) {
    this.nativeAdapter.setKeyboardDelay(this.config.autoDelayMs);
  }

  public type(...input: StringOrKey): Promise<Keyboard> {
    return new Promise<Keyboard>(async (resolve, reject) => {
      try {
        if (inputIsString(input)) {
          for (const char of input.join(" ").split("")) {
            await sleep(this.config.autoDelayMs);
            await this.nativeAdapter.type(char);
          }
        } else {
          await this.nativeAdapter.click(...input as Key[]);
        }
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  public pressKey(...keys: Key[]): Promise<Keyboard> {
    return new Promise<Keyboard>(async (resolve, reject) => {
      try {
        await this.nativeAdapter.pressKey(...keys);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  public releaseKey(...keys: Key[]): Promise<Keyboard> {
    return new Promise<Keyboard>(async (resolve, reject) => {
      try {
        await this.nativeAdapter.releaseKey(...keys);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }
}
