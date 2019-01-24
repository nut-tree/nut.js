import { Key } from "../../key.enum";

/**
 * A KeyboardActionProvider should provide access to a system's keyboard
 *
 * @interface KeyboardActionProvider
 */
export interface KeyboardActionProvider {
  /**
   * type should allow to type a given text via OS level keyboard events
   *
   * @param {string} input The text to type
   * @memberof KeyboardActionProvider
   */
  type(input: string): void;

  /**
   * Click should allow to press a single key via OS level keyboard event
   *
   * @param {Key} key The key to click
   * @memberof KeyboardActionProvider
   */
  click(key: Key): void;

  /**
   * pressKey should allow to press and hold a key via OS level keyboard event
   *
   * @param {Key} key
   * @memberof KeyboardActionProvider
   */
  pressKey(key: Key): void;

  /**
   * releaseKey should release a pressed key via OS level keyboard event
   *
   * @param {Key} key The key to release
   * @memberof KeyboardActionProvider
   */
  releaseKey(key: Key): void;
}
