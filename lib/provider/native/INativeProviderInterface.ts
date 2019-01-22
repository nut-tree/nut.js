import { Button } from "../../button.enum";
import { Image } from "../../image.class";
import { Key } from "../../key.enum";
import { Point } from "../../point.class";
import { Region } from "../../region.class";

export interface INativeProviderInterface {
  // SCREEN
  grabScreen(): Promise<Image>;
  grabScreenRegion(region: Region): Promise<Image>;
  screenWidth(): number;
  screenHeight(): number;
  screenSize(): Region;

  // MOUSE
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

  // KEYBOARD
  type(input: string): void;
  click(key: Key): void;
  pressKey(key: Key): void;
  releaseKey(key: Key): void;

  // CLIPBOARD
  copy(text: string): void;
  paste(): string;
}
