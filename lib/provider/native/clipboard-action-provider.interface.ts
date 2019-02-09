/**
 * A ClipboardActionProvider should allow access to the system clipboard
 *
 * @interface ClipboardActionProvider
 */
export interface ClipboardActionProvider {
  /**
   * hasText should return whether the system clipboard currently holds text or not
   *
   * @returns {boolean} True if there's text on the clipboard, false otherwise
   * @memberof ClipboardActionProvider
   */
  hasText(): boolean;

  /**
   * clear should allow to clear the system clipboard
   *
   * @returns {boolean}
   * @memberof ClipboardActionProvider
   */
  clear(): boolean;

  /**
   * copy should allow to copy text to the system's clipboard
   *
   * @param {string} text The text to copy to the clipboard
   * @memberof ClipboardActionProvider
   */
  copy(text: string): void;

  /**
   * paste should allow to paste the current text on the system's clipboard
   *
   * @returns {string} The current clipboard text
   * @memberof ClipboardActionProvider
   */
  paste(): string;
}
