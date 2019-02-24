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

  public setPosition(target: Point): Mouse {
    this.native.setMousePosition(target);
    return this;
  }

  public getPosition(): Promise<Point> {
    return this.native.currentMousePosition();
  }

  public move(path: Point[], movementType = MovementType.linear): Mouse {
    const timeSteps = movementType(path.length, this.config.mouseSpeed);
    for (let idx = 0; idx < path.length; ++idx) {
      const node = path[idx];
      const minTime = timeSteps[idx];
      this.waitForNextTick(minTime);
      this.native.setMousePosition(node);
      this.updateTick();
    }
    return this;
  }

  public leftClick(): Mouse {
    this.waitForNextTick(this.config.autoDelayMs);
    this.native.leftClick();
    this.updateTick();
    return this;
  }

  public rightClick(): Mouse {
    this.waitForNextTick(this.config.autoDelayMs);
    this.native.rightClick();
    this.updateTick();
    return this;
  }

  public scrollDown(amount: number): Mouse {
    this.waitForNextTick(this.config.autoDelayMs);
    this.native.scrollDown(amount);
    this.updateTick();
    return this;
  }

  public scrollUp(amount: number): Mouse {
    this.waitForNextTick(this.config.autoDelayMs);
    this.native.scrollUp(amount);
    this.updateTick();
    return this;
  }

  public scrollLeft(amount: number): Mouse {
    this.waitForNextTick(this.config.autoDelayMs);
    this.native.scrollLeft(amount);
    this.updateTick();
    return this;
  }

  public scrollRight(amount: number): Mouse {
    this.waitForNextTick(this.config.autoDelayMs);
    this.native.scrollRight(amount);
    this.updateTick();
    return this;
  }

  public drag(path: Point[]): Mouse {
    this.waitForNextTick(this.config.autoDelayMs);
    this.native.pressButton(Button.LEFT);
    this.move(path);
    this.native.releaseButton(Button.LEFT);
    this.updateTick();
    return this;
  }

  private updateTick() {
    this.lastAction = Date.now();
  }

  private waitForNextTick(minTime: number) {
    let current = Date.now();
    while (current - this.lastAction < minTime) {
      current = Date.now();
    }
  }
}
