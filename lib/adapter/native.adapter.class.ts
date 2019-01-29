import { Button } from "../button.enum";
import { Image } from "../image.class";
import { Key } from "../key.enum";
import { Point } from "../point.class";
import { ClipboardActionProvider } from "../provider/native/clipboard-action-provider.interface";
import { KeyboardActionProvider } from "../provider/native/keyboard-action-provider.interface";
import { MouseActionInterface } from "../provider/native/mouse-action-provider.interface";
import { RobotClipboardAction } from "../provider/native/robot-clipboard-action.class";
import { RobotKeyboardAction } from "../provider/native/robot-keyboard-action.class";
import { RobotMouseAction } from "../provider/native/robot-mouse-action.class";
import { RobotScreenAction } from "../provider/native/robot-screen-action.class";
import { ScreenActionProvider } from "../provider/native/screen-action-provider.interface";
import { Region } from "../region.class";

/**
 * NativeAdapter serves as an abstraction layer for all OS level interactions.
 *
 * This allows to provide a high level interface for native actions,
 * whithout having to spread (possibly) multiple dependencies all over the code.
 * All actions which involve the OS are bundled in this adapter.
 */
export class NativeAdapter {
  constructor(
    private clipboard: ClipboardActionProvider = new RobotClipboardAction(),
    private keyboard: KeyboardActionProvider = new RobotKeyboardAction(),
    private mouse: MouseActionInterface = new RobotMouseAction(),
    private screen: ScreenActionProvider = new RobotScreenAction(),
  ) {}

  /**
   * grabScreen will return an Image containing the current screen image
   *
   * @returns {Promise<Image>} Image will contain screenshot data as well as dimensions
   * @memberof NativeAdapter
   */
  public grabScreen(): Promise<Image> {
    return this.screen.grabScreen();
  }

  /**
   * grabScreenRegion essentially does the same as grabScreen, but only returns a specified Region
   *
   * @param {Region} region The screen region we want to grab
   * @returns {Promise<Image>} Image will contain screenshot data of the specified region as well as dimensions
   * @memberof NativeAdapter
   */
  public grabScreenRegion(region: Region): Promise<Image> {
    return this.screen.grabScreenRegion(region);
  }

  /**
   * setMouseDelay configures mouse speed for movement
   *
   * @param {number} delay The delay
   * @memberof NativeAdapter
   */
  public setMouseDelay(delay: number): void {
    this.mouse.setMouseDelay(delay);
  }

  /**
   * setMousePosition changes the current mouse cursor position to a given point
   *
   * @param {Point} p The new cursor position
   * @memberof NativeAdapter
   */
  public setMousePosition(p: Point): void {
    this.mouse.setMousePosition(p);
  }

  /**
   * getMousePosition returns the current mouse position
   *
   * @returns {Point} Current cursor position
   * @memberof NativeAdapter
   */
  public currentMousePosition(): Point {
    return this.mouse.currentMousePosition();
  }

  /**
   * screenWidth returns the main screen's width as reported by the OS.
   * Please notice that on e.g. Apples Retina display the reported width
   * and the actual pixel size may differ
   *
   * @returns {number} The main screen's width as reported by the OS
   * @memberof NativeAdapter
   */
  public screenWidth(): number {
    return this.screen.screenWidth();
  }

  /**
   * screenHeight returns the main screen's height as reported by the OS.
   * Please notice that on e.g. Apples Retina display the reported width
   * and the actual pixel size may differ
   *
   * @returns {number} The main screen's height as reported by the OS
   * @memberof NativeAdapter
   */
  public screenHeight(): number {
    return this.screen.screenHeight();
  }

  /**
   * screenSize returns a Region object with the main screen's size.
   * Please notice that on e.g. Apples Retina display the reported width
   * and the actual pixel size may differ
   *
   * @returns {Region} The Region object the size of your main screen
   * @memberof NativeAdapter
   */
  public screenSize(): Region {
    return this.screen.screenSize();
  }

  /**
   * leftClick triggers a native left-click event via OS API
   *
   * @memberof NativeAdapter
   */
  public leftClick(): void {
    this.mouse.leftClick();
  }

  /**
   * rightClick triggers a native right-click event via OS API
   *
   * @memberof NativeAdapter
   */
  public rightClick(): void {
    this.mouse.rightClick();
  }

  /**
   * pressButton presses and holds a mouse button
   *
   * @param {Button} btn The mouse button to press
   * @memberof NativeAdapter
   */
  public pressButton(btn: Button): void {
    this.mouse.pressButton(btn);
  }

  /**
   * releaseButton releases a mouse button previously clicked via pressButton
   *
   * @param {Button} btn The mouse button to release
   * @memberof NativeAdapter
   */
  public releaseButton(btn: Button): void {
    this.mouse.releaseButton(btn);
  }

  /**
   * type types a given string via native keyboard events
   *
   * @param {string} input The text to type
   * @memberof NativeAdapter
   */
  public type(input: string): void {
    this.keyboard.type(input);
  }

  /**
   * click clicks a single Key via native keyboard event
   *
   * @param {Key} key The Key to click
   * @memberof NativeAdapter
   */
  public click(key: Key): void {
    this.keyboard.click(key);
  }

  /**
   * pressKey presses and holds a given Key
   *
   * @param {Key} key The Key to press and hold
   * @memberof NativeAdapter
   */
  public pressKey(key: Key): void {
    this.keyboard.pressKey(key);
  }

  /**
   * releaseKey releases a Key previously presses via pressKey
   *
   * @param {Key} key The Key to release
   * @memberof NativeAdapter
   */
  public releaseKey(key: Key): void {
    this.keyboard.releaseKey(key);
  }

  /**
   * scrollUp triggers an upwards mouse wheel scroll
   *
   * @param {number} amount The amount of 'ticks' to scroll
   * @memberof NativeAdapter
   */
  public scrollUp(amount: number): void {
    this.mouse.scrollUp(amount);
  }

  /**
   * scrollDown triggers a downward mouse wheel scroll
   *
   * @param {number} amount The amount of 'ticks' to scroll
   * @memberof NativeAdapter
   */
  public scrollDown(amount: number): void {
    this.mouse.scrollDown(amount);
  }

  /**
   * scrollLeft triggers a left mouse scroll
   *
   * @param {number} amount The amount of 'ticks' to scroll
   * @memberof NativeAdapter
   */
  public scrollLeft(amount: number): void {
    this.mouse.scrollLeft(amount);
  }

  /**
   * scrollRight triggers a right mouse scroll
   *
   * @param {number} amount The amount of 'ticks' to scroll
   * @memberof NativeAdapter
   */
  public scrollRight(amount: number): void {
    this.mouse.scrollRight(amount);
  }

  /**
   * copy copies a given text to the system clipboard
   *
   * @param {string} text The text to copy
   * @memberof NativeAdapter
   */
  public copy(text: string): void {
    this.clipboard.copy(text);
  }

  /**
   * paste pastes the current text on the system clipboard
   *
   * @returns {string} The clipboard text
   * @memberof NativeAdapter
   */
  public paste(): string {
    return this.clipboard.paste();
  }
}
