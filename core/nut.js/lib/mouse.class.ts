import { Button, isPoint, Point } from "@nut-tree/shared";
import { busyWaitForNanoSeconds, sleep } from "./sleep.function";
import { calculateMovementTimesteps, EasingFunction, linear } from "./mouse-movement.function";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";

/**
 * Config object for {@link MouseClass} class
 */
export interface MouseConfig {
  /**
   * Configures the delay between single mouse events
   */
  autoDelayMs: number;

  /**
   * Configures the speed in pixels/second for mouse movement
   */
  mouseSpeed: number;
}

/**
 * {@link MouseClass} class provides methods to emulate mouse input
 */
export class MouseClass {
  public config: MouseConfig = {
    autoDelayMs: 100,
    mouseSpeed: 1000
  };

  /**
   * {@link MouseClass} class constructor
   * @param providerRegistry
   */
  constructor(private providerRegistry: ProviderRegistry) {
    if (this.providerRegistry.hasMouse()) {
      this.providerRegistry.getMouse().setMouseDelay(0);
    }
  }

  /**
   * {@link setPosition} instantly moves the mouse cursor to a given {@link Point}
   * @param target {@link Point} to move the cursor to
   */
  public async setPosition(target: Point): Promise<MouseClass> {
    if (!isPoint(target)) {
      const e = new Error(
        `setPosition requires a Point, but received ${JSON.stringify(target)}`
      );
      this.providerRegistry.getLogProvider().error(e);
      throw e;
    }
    this.providerRegistry
      .getLogProvider()
      .trace("Setting mouse position", target);
    try {
      await this.providerRegistry.getMouse().setMousePosition(target);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link getPosition} returns a {@link Point} representing the current mouse position
   */
  public async getPosition(): Promise<Point> {
    const currentPosition = await this.providerRegistry
      .getMouse()
      .currentMousePosition();
    this.providerRegistry
      .getLogProvider()
      .debug("Retrieving current mouse position", { currentPosition });
    return currentPosition;
  }

  /**
   * {@link move} moves the mouse cursor along a given path of {@link Point}s, according to a movement type
   * @param path Array of {@link Point}s to follow
   * @param movementType Defines the type of mouse movement. Would allow to configured acceleration etc. (Default: {@link linear}, no acceleration)
   */
  public async move(
    path: Point[] | Promise<Point[]>,
    movementType: EasingFunction = linear
  ): Promise<MouseClass> {
    try {
      let pathSteps = await path;
      if (!Array.isArray(pathSteps)) {
        pathSteps = [pathSteps];
      }
      this.providerRegistry
        .getLogProvider()
        .info(
          `Moving mouse to target point ${pathSteps[pathSteps.length - 1]}`
        );
      const timeSteps = calculateMovementTimesteps(
        pathSteps.length,
        this.config.mouseSpeed,
        movementType
      );
      for (let idx = 0; idx < pathSteps.length; ++idx) {
        const node = pathSteps[idx];
        const minTime = timeSteps[idx];
        await busyWaitForNanoSeconds(minTime);
        await this.setPosition(node);
      }
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link leftClick} performs a click with the left mouse button
   */
  public async leftClick(): Promise<MouseClass> {
    return this.click(Button.LEFT);
  }

  /**
   * {@link rightClick} performs a click with the right mouse button
   */
  public async rightClick(): Promise<MouseClass> {
    return this.click(Button.RIGHT);
  }

  /**
   * {@link scrollDown} scrolls down for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public async scrollDown(amount: number): Promise<MouseClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getMouse().scrollDown(amount);
      this.providerRegistry
        .getLogProvider()
        .info(`Scrolled down ${amount} steps`);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link scrollUp} scrolls up for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public async scrollUp(amount: number): Promise<MouseClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getMouse().scrollUp(amount);
      this.providerRegistry
        .getLogProvider()
        .info(`Scrolled up ${amount} steps`);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link scrollLeft} scrolls left for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public async scrollLeft(amount: number): Promise<MouseClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getMouse().scrollLeft(amount);
      this.providerRegistry
        .getLogProvider()
        .info(`Scrolled left ${amount} steps`);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link scrollRight} scrolls right for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public async scrollRight(amount: number): Promise<MouseClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getMouse().scrollRight(amount);
      this.providerRegistry
        .getLogProvider()
        .info(`Scrolled right ${amount} steps`);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link drag} drags the mouse along a certain path
   * In summary, {@link drag} presses and holds the left mouse button, moves the mouse and releases the left button
   * @param path The path of {@link Point}s to drag along
   */
  public async drag(path: Point[] | Promise<Point[]>): Promise<MouseClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getMouse().pressButton(Button.LEFT);
      this.providerRegistry.getLogProvider().info("Pressed left mouse button");
      await this.move(path);
      await this.providerRegistry.getMouse().releaseButton(Button.LEFT);
      this.providerRegistry.getLogProvider().info("Released left mouse button");
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link pressButton} presses and holds a mouse button
   * @param btn The {@link Button} to press and hold
   */
  public async pressButton(btn: Button): Promise<MouseClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getMouse().pressButton(btn);
      const btnName = Button[btn];
      this.providerRegistry
        .getLogProvider()
        .info(`Pressed ${btnName} mouse button`);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link releaseButton} releases a mouse button previously pressed via {@link pressButton}
   * @param btn The {@link Button} to release
   */
  public async releaseButton(btn: Button): Promise<MouseClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getMouse().releaseButton(btn);
      const btnName = Button[btn];
      this.providerRegistry
        .getLogProvider()
        .info(`Pressed ${btnName} mouse button`);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link click} clicks a mouse button
   * @param btn The {@link Button} to click
   */
  public async click(btn: Button): Promise<MouseClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getMouse().click(btn);
      const btnName = Button[btn];
      this.providerRegistry
        .getLogProvider()
        .info(`Pressed ${btnName} mouse button`);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link doubleClick} performs a double click on a mouse button
   * @param btn The {@link Button} to click
   */
  public async doubleClick(btn: Button): Promise<MouseClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getMouse().doubleClick(btn);
      const btnName = Button[btn];
      this.providerRegistry
        .getLogProvider()
        .info(`Pressed ${btnName} mouse button`);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }
}
