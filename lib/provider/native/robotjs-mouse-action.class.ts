import robot = require("robotjs");
import { Button } from "../../button.enum";
import { Point } from "../../point.class";
import { MouseActionInterface } from "./mouse-action-provider.interface";

export class MouseAction implements MouseActionInterface {
  public static buttonLookup(btn: Button): any {
    return this.ButtonLookupMap.get(btn);
  }

  private static ButtonLookupMap: Map<Button, string> = new Map<Button, string>(
    [[Button.LEFT, "left"], [Button.MIDDLE, "middle"], [Button.RIGHT, "right"]],
  );

  constructor() {}

  public setMouseDelay(delay: number): void {
    robot.setMouseDelay(delay);
  }

  public setMousePosition(p: Point): void {
    robot.moveMouse(p.x, p.y);
  }

  public currentMousePosition(): Promise<Point> {
    const position = robot.getMousePos();
    return Promise.resolve(new Point(position.x, position.y));
  }

  public leftClick(): void {
    robot.mouseClick(MouseAction.buttonLookup(Button.LEFT));
  }

  public rightClick(): void {
    robot.mouseClick(MouseAction.buttonLookup(Button.RIGHT));
  }

  public middleClick(): void {
    robot.mouseClick(MouseAction.buttonLookup(Button.MIDDLE));
  }

  public pressButton(btn: Button): void {
    robot.mouseToggle("down", MouseAction.buttonLookup(btn));
  }

  public releaseButton(btn: Button): void {
    robot.mouseToggle("up", MouseAction.buttonLookup(btn));
  }

  public scrollUp(amount: number): void {
    robot.scrollMouse(0, amount);
  }

  public scrollDown(amount: number): void {
    robot.scrollMouse(0, -amount);
  }

  public scrollLeft(amount: number): void {
    robot.scrollMouse(-amount, 0);
  }

  public scrollRight(amount: number): void {
    robot.scrollMouse(amount, 0);
  }
}
