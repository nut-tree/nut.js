import robot = require("robot-js");
import { Button } from "../../button.enum";
import { Point } from "../../point.class";
import { MouseActionInterface } from "./MouseActionProvider.interface";

export class RobotMouseAction implements MouseActionInterface {
  public static buttonLookup(btn: Button): any {
    return this.ButtonLookupMap.get(btn);
  }

  private static ButtonLookupMap = new Map<Button, any>([
    [Button.LEFT, robot.BUTTON_LEFT],
    [Button.MIDDLE, robot.BUTTON_MIDDLE],
    [Button.RIGHT, robot.BUTTON_RIGHT]
  ]);

  private mouse: any;

  constructor() {
    this.mouse = robot.Mouse();
  }

  public setMouseDelay(delay: number): void {
    this.mouse.autoDelay.min = delay;
    this.mouse.autoDelay.max = delay;
  }

  public setMousePosition(p: Point): void {
    robot.Mouse.setPos(p.x, p.y);
  }

  public currentMousePosition(): Point {
    const robotPoint = robot.Mouse.getPos();
    return new Point(robotPoint.x, robotPoint.y);
  }

  public leftClick(): void {
    this.mouse.click(robot.BUTTON_LEFT);
  }

  public rightClick(): void {
    this.mouse.click(robot.BUTTON_RIGHT);
  }

  public pressButton(btn: Button): void {
    this.mouse.press(RobotMouseAction.buttonLookup(btn));
  }

  public releaseButton(btn: Button): void {
    this.mouse.release(RobotMouseAction.buttonLookup(btn));
  }

  public scrollUp(amount: number): void {
    this.mouse.scrollV(amount);
  }

  public scrollDown(amount: number): void {
    this.mouse.scrollV(-amount);
  }

  public scrollLeft(amount: number): void {
    this.mouse.scrollV(-amount);
  }

  public scrollRight(amount: number): void {
    this.mouse.scrollV(amount);
  }
}
