import { Button } from "../button.enum";
import { Key } from "../key.enum";
import { Point } from "../point.class";
import { ClipboardActionProvider } from "../provider/native/clipboard-action-provider.interface";
import { ClipboardAction } from "../provider/native/clipboardy-clipboard-action.class";
import { KeyboardActionProvider } from "../provider/native/keyboard-action-provider.interface";
import { MouseActionInterface } from "../provider/native/mouse-action-provider.interface";
import { KeyboardAction } from "../provider/native/robotjs-keyboard-action.class";
import { MouseAction } from "../provider/native/robotjs-mouse-action.class";

/**
 * NativeAdapter serves as an abstraction layer for all OS level interactions.
 *
 * This allows to provide a high level interface for native actions,
 * whithout having to spread (possibly) multiple dependencies all over the code.
 * All actions which involve the OS are bundled in this adapter.
 */
export class NativeAdapter {
  constructor(
    private clipboard: ClipboardActionProvider = new ClipboardAction(),
    private keyboard: KeyboardActionProvider = new KeyboardAction(),
    private mouse: MouseActionInterface = new MouseAction(),
  ) {}

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
   * setKeyboardDelay configures keyboard delay between key presses
   *
   * @param {number} delay The delay
   * @memberof NativeAdapter
   */
  public setKeyboardDelay(delay: number): void {
    this.keyboard.setKeyboardDelay(delay);
  }

  /**
   * setMousePosition changes the current mouse cursor position to a given point
   *
   * @param {Point} p The new cursor position
   * @memberof NativeAdapter
   */
  public async setMousePosition(p: Point): Promise<void> {
    await this.mouse.setMousePosition(p);
  }

  /**
   * getMousePosition returns the current mouse position
   *
   * @returns {Promise<Point>} Current cursor position
   * @memberof NativeAdapter
   */
  public async currentMousePosition(): Promise<Point> {
    return await this.mouse.currentMousePosition();
  }

  /**
   * leftClick triggers a native left-click event via OS API
   *
   * @memberof NativeAdapter
   */
  public async leftClick(): Promise<void> {
    await this.mouse.leftClick();
  }

  /**
   * rightClick triggers a native right-click event via OS API
   *
   * @memberof NativeAdapter
   */
  public async rightClick(): Promise<void> {
    await this.mouse.rightClick();
  }

  /**
   * middleClick triggers a native middle-click event via OS API
   */
  public async middleClick(): Promise<void> {
    await this.mouse.middleClick();
  }

  /**
   * pressButton presses and holds a mouse button
   *
   * @param {Button} btn The mouse button to press
   * @memberof NativeAdapter
   */
  public async pressButton(btn: Button): Promise<void> {
    await this.mouse.pressButton(btn);
  }

  /**
   * releaseButton releases a mouse button previously clicked via pressButton
   *
   * @param {Button} btn The mouse button to release
   * @memberof NativeAdapter
   */
  public async releaseButton(btn: Button): Promise<void> {
    await this.mouse.releaseButton(btn);
  }

  /**
   * type types a given string via native keyboard events
   *
   * @param {string} input The text to type
   * @memberof NativeAdapter
   */
  public async type(input: string): Promise<void> {
    await this.keyboard.type(input);
  }

  /**
   * click clicks a single Key via native keyboard event
   *
   * @param {Key[]} keys The keys to click
   * @memberof NativeAdapter
   */
  public async click(...keys: Key[]): Promise<void> {
    await this.keyboard.click(...keys);
  }

  /**
   * pressKey presses and holds a given Key
   *
   * @param {Key[]} keys The Keys to press and hold
   * @memberof NativeAdapter
   */
  public async pressKey(...keys: Key[]): Promise<void> {
    await this.keyboard.pressKey(...keys);
  }

  /**
   * releaseKey releases a Key previously presses via pressKey
   *
   * @param {Key[]} keys The Keys to release
   * @memberof NativeAdapter
   */
  public async releaseKey(...keys: Key[]): Promise<void> {
    await this.keyboard.releaseKey(...keys);
  }

  /**
   * scrollUp triggers an upwards mouse wheel scroll
   *
   * @param {number} amount The amount of 'ticks' to scroll
   * @memberof NativeAdapter
   */
  public async scrollUp(amount: number): Promise<void> {
    await this.mouse.scrollUp(amount);
  }

  /**
   * scrollDown triggers a downward mouse wheel scroll
   *
   * @param {number} amount The amount of 'ticks' to scroll
   * @memberof NativeAdapter
   */
  public async scrollDown(amount: number): Promise<void> {
    await this.mouse.scrollDown(amount);
  }

  /**
   * scrollLeft triggers a left mouse scroll
   *
   * @param {number} amount The amount of 'ticks' to scroll
   * @memberof NativeAdapter
   */
  public async scrollLeft(amount: number): Promise<void> {
    await this.mouse.scrollLeft(amount);
  }

  /**
   * scrollRight triggers a right mouse scroll
   *
   * @param {number} amount The amount of 'ticks' to scroll
   * @memberof NativeAdapter
   */
  public async scrollRight(amount: number): Promise<void> {
    await this.mouse.scrollRight(amount);
  }

  /**
   * copy copies a given text to the system clipboard
   *
   * @param {string} text The text to copy
   * @memberof NativeAdapter
   */
  public async copy(text: string): Promise<void> {
    await this.clipboard.copy(text);
  }

  /**
   * paste pastes the current text on the system clipboard
   *
   * @returns {Promise<string>} The clipboard text
   * @memberof NativeAdapter
   */
  public async paste(): Promise<string> {
    return await this.clipboard.paste();
  }
}
