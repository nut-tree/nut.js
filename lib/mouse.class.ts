import { NativeAdapter } from "./adapter/native.adapter.class";
import { Button } from "./button.enum";
import { linear } from "./movementtype.function";
import { Point } from "./point.class";
import { sleep } from "./sleep.function";

export class Mouse {
  public config = {
    autoDelayMs: 100,
    mouseSpeed: 1000,
  };

  constructor(private native: NativeAdapter) {
    this.native.setMouseDelay(0);
  }

  public async setPosition(target: Point): Promise<Mouse> {
    return new Promise<Mouse>(async (resolve, reject) => {
      try {
        await this.native.setMousePosition(target);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  public getPosition(): Promise<Point> {
    return this.native.currentMousePosition();
  }

  public async move(path: Point[] | Promise<Point[]>, movementType = linear): Promise<Mouse> {
    return new Promise<Mouse>(async (resolve, reject) => {
      try {
        const pathSteps = await path;
        const timeSteps = movementType(pathSteps.length, this.config.mouseSpeed);
        for (let idx = 0; idx < pathSteps.length; ++idx) {
          const node = pathSteps[idx];
          const minTime = timeSteps[idx];
          await sleep(minTime);
          await this.native.setMousePosition(node);
        }
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  public async leftButtonDown(): Promise<Mouse> {
    await sleep(this.config.autoDelayMs);
    await this.native.pressButton(Button.LEFT);
    return this;
  }

  public async rightButtonDown(): Promise<Mouse> {
    await sleep(this.config.autoDelayMs);
    await this.native.pressButton(Button.RIGHT);
    return this;
  }

  public async middleButtonDown(): Promise<Mouse> {
    await sleep(this.config.autoDelayMs);
    await this.native.pressButton(Button.MIDDLE);
    return this;
  }

  public async leftButtonUp(): Promise<Mouse> {
    await sleep(this.config.autoDelayMs);
    await this.native.releaseButton(Button.LEFT);
    return this;
  }

  public async rightButtonUp(): Promise<Mouse> {
    await sleep(this.config.autoDelayMs);
    await this.native.releaseButton(Button.RIGHT);
    return this;
  }

  public async middleButtonUp(): Promise<Mouse> {
    await sleep(this.config.autoDelayMs);
    await this.native.releaseButton(Button.MIDDLE);
    return this;
  }

  public async leftClick(): Promise<Mouse> {
    return new Promise<Mouse>(async resolve => {
      await sleep(this.config.autoDelayMs);
      await this.native.leftClick();
      resolve(this);
    });
  }

  public async rightClick(): Promise<Mouse> {
    return new Promise<Mouse>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.native.rightClick();
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  public async scrollDown(amount: number): Promise<Mouse> {
    return new Promise<Mouse>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.native.scrollDown(amount);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  public async scrollUp(amount: number): Promise<Mouse> {
    return new Promise<Mouse>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.native.scrollUp(amount);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  public async scrollLeft(amount: number): Promise<Mouse> {
    return new Promise<Mouse>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.native.scrollLeft(amount);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  public async scrollRight(amount: number): Promise<Mouse> {
    return new Promise<Mouse>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.native.scrollRight(amount);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  public async drag(path: Point[] | Promise<Point[]>): Promise<Mouse> {
    return new Promise<Mouse>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.native.pressButton(Button.LEFT);
        await this.move(path);
        await this.native.releaseButton(Button.LEFT);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }
}
