import { Button } from "../../button.enum";
import { Point } from "../../point.class";

export interface MouseActionInterface {
  setMouseDelay(delay: number): void;
  setMousePosition(p: Point): void;
  currentMousePosition(): Point;
  leftClick(): void;
  rightClick(): void;
  scrollUp(amount: number): void;
  scrollDown(amount: number): void;
  scrollLeft(amount: number): void;
  scrollRight(amount: number): void;
  pressButton(btn: Button): void;
  releaseButton(btn: Button): void;
}
