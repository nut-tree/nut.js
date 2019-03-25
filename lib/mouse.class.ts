import { NativeAdapter } from "./adapter/native.adapter.class";
import { Button } from "./button.enum";
import { MovementType } from "./movementtype.class";
import { Point } from "./point.class";

export class Mouse {
  public config = {
    autoDelayMs: 100,
    mouseSpeed: 1000,
  };

  private lastAction: number;

  constructor(private native: NativeAdapter) {
    this.native.setMouseDelay(0);
    this.lastAction = Date.now();
  }

  public async setPosition(target: Point): Promise<Mouse> {
    return new Promise<Mouse>(async resolve => {
      await this.native.setMousePosition(target);
      resolve(this);
    });
  }

  public getPosition(): Promise<Point> {
    return this.native.currentMousePosition();
  }

  public async move(path: Point[], movementType = MovementType.linear): Promise<Mouse> {
    return new Promise<Mouse>(async resolve => {
      const timeSteps = movementType(path.length, this.config.mouseSpeed);
      for (let idx = 0; idx < path.length; ++idx) {
        const node = path[idx];
        const minTime = timeSteps[idx];
        await this.waitForNextTick(minTime);
        await this.native.setMousePosition(node);
        await this.updateTick();
      }
      resolve(this);
    });
  }

  public async leftClick(): Promise<Mouse> {
    return new Promise<Mouse>(async resolve => {
      await this.waitForNextTick(this.config.autoDelayMs);
      await this.native.leftClick();
      await this.updateTick();
      resolve(this);
    });
  }

  public async rightClick(): Promise<Mouse> {
    return new Promise<Mouse>(async resolve => {
      await this.waitForNextTick(this.config.autoDelayMs);
      await this.native.rightClick();
      await this.updateTick();
      resolve(this);
    });
  }

  public async scrollDown(amount: number): Promise<Mouse> {
    return new Promise<Mouse>(async resolve => {
      await this.waitForNextTick(this.config.autoDelayMs);
      await this.native.scrollDown(amount);
      await this.updateTick();
      resolve(this);
    });
  }

  public async scrollUp(amount: number): Promise<Mouse> {
    return new Promise<Mouse>(async resolve => {
      await this.waitForNextTick(this.config.autoDelayMs);
      await this.native.scrollUp(amount);
      await this.updateTick();
      resolve(this);
    });
  }

  public async scrollLeft(amount: number): Promise<Mouse> {
    return new Promise<Mouse>(async resolve => {
      await this.waitForNextTick(this.config.autoDelayMs);
      await this.native.scrollLeft(amount);
      await this.updateTick();
      resolve(this);
    });
  }

  public async scrollRight(amount: number): Promise<Mouse> {
    return new Promise<Mouse>(async resolve => {
      await this.waitForNextTick(this.config.autoDelayMs);
      await this.native.scrollRight(amount);
      await this.updateTick();
      resolve(this);
    });
  }

  public async drag(path: Point[]): Promise<Mouse> {
    return new Promise<Mouse>(async resolve => {
      await this.waitForNextTick(this.config.autoDelayMs);
      await this.native.pressButton(Button.LEFT);
      await this.move(path);
      await this.native.releaseButton(Button.LEFT);
      await this.updateTick();
      resolve(this);
    });
  }

  private async updateTick() {
    this.lastAction = Date.now();
  }

  private async waitForNextTick(minTime: number): Promise<void> {
    return new Promise<void>(resolve => {
      let current = Date.now();
      while (current - this.lastAction < minTime) {
        current = Date.now();
      }
      resolve();
    });
  }
}
