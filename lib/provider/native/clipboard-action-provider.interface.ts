/**
 * A ClipboardActionProvider should allow access to the system clipboard
 *
 * @interface ClipboardActionProvider
 */
export interface ClipboardActionProvider {
  /**
   * hasText should return whether the system clipboard currently holds text or not
   *
   * @returns {Promise<boolean>} True if there's text on the clipboard, false otherwise
   * @memberof ClipboardActionProvider
   */
  hasText(): Promise<boolean>;

  /**
   * clear should allow to clear the system clipboard
   *
   * @returns {Promise<boolean>} Successfully cleared or not
   * @memberof ClipboardActionProvider
   */
  clear(): Promise<boolean>;

  /**
   * copy should allow to copy text to the system's clipboard
   *
   * @param {string} text The text to copy to the clipboard
   * @memberof ClipboardActionProvider
   */
  copy(text: string): Promise<void>;

  /**
   * paste should allow to paste the current text on the system's clipboard
   *
   * @returns {Promise<string>} The current clipboard text
   * @memberof ClipboardActionProvider
   */
  paste(): Promise<string>;
}
