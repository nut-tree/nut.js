import { Button } from "../button.enum";
import { Image } from "../image.class";
import { Key } from "../key.enum";
import { Point } from "../point.class";
import { ClipboardActionProvider } from "../provider/native/ClipboardActionProvider.interface";
import { KeyboardActionProvider } from "../provider/native/KeyboardActionProvider.interface";
import { MouseActionInterface } from "../provider/native/MouseActionProvider.interface";
import { RobotClipboardAction } from "../provider/native/RobotClipboardAction.class";
import { RobotKeyboardAction } from "../provider/native/RobotKeyboardAction.class";
import { RobotMouseAction } from "../provider/native/RobotMouseAction.class";
import { RobotScreenAction } from "../provider/native/RobotScreenAction.class";
import { ScreenActionProvider } from "../provider/native/ScreenActionProvider.interface";
import { Region } from "../region.class";

export class NativeAdapter {
  constructor(
    private clipboard: ClipboardActionProvider = new RobotClipboardAction(),
    private keyboard: KeyboardActionProvider = new RobotKeyboardAction(),
    private mouse: MouseActionInterface = new RobotMouseAction(),
    private screen: ScreenActionProvider = new RobotScreenAction(),
  ) {}

  public grabScreen(): Promise<Image> {
    return this.screen.grabScreen();
  }

  public grabScreenRegion(region: Region): Promise<Image> {
    return this.screen.grabScreenRegion(region);
  }

  public setMouseDelay(delay: number): void {
    this.mouse.setMouseDelay(delay);
  }

  public setMousePosition(p: Point): void {
    this.mouse.setMousePosition(p);
  }

  public currentMousePosition(): Point {
    return this.mouse.currentMousePosition();
  }

  public screenWidth(): number {
    return this.screen.screenWidth();
  }

  public screenHeight(): number {
    return this.screen.screenHeight();
  }

  public screenSize(): Region {
    return this.screen.screenSize();
  }

  public leftClick(): void {
    this.mouse.leftClick();
  }

  public rightClick(): void {
    this.mouse.rightClick();
  }

  public pressButton(btn: Button): void {
    this.mouse.pressButton(btn);
  }

  public releaseButton(btn: Button): void {
    this.mouse.releaseButton(btn);
  }

  public type(input: string): void {
    this.keyboard.type(input);
  }

  public click(key: Key): void {
    this.keyboard.click(key);
  }

  public pressKey(key: Key): void {
    this.keyboard.pressKey(key);
  }

  public releaseKey(key: Key): void {
    this.keyboard.releaseKey(key);
  }

  public scrollUp(amount: number): void {
    this.mouse.scrollUp(amount);
  }

  public scrollDown(amount: number): void {
    this.mouse.scrollDown(amount);
  }

  public scrollLeft(amount: number): void {
    this.mouse.scrollLeft(amount);
  }

  public scrollRight(amount: number): void {
    this.mouse.scrollRight(amount);
  }

  public copy(text: string): void {
    this.clipboard.copy(text);
  }

  public paste(): string {
    return this.clipboard.paste();
  }
}
