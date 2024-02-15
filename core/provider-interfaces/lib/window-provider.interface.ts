import { Point, Region, Size } from "@nut-tree/shared";

/**
 * A WindowActionProvider should provide access to a system's window system
 *
 * @interface WindowProviderInterface
 */
export interface WindowProviderInterface {
  /**
   * {@link getWindows} returns a list of window handles for further processing.
   * These window handles may serve as input to e.g. {@link getWindowTitle}
   *
   * @returns A list of window handles
   */
  getWindows(): Promise<number[]>;

  /**
   * {@link getActiveWindow} returns the window handle of the currently active foreground window
   *
   * @returns The handle to the currently active foreground window
   */
  getActiveWindow(): Promise<number>;

  /**
   * {@link getWindowTitle} returns the title of a window addressed via its window handle
   *
   * @returns A string representing the title of a window addressed via its window handle
   */
  getWindowTitle(windowHandle: number): Promise<string>;

  /**
   * {@link getWindowRegion} returns a {@link Region} object representing the size and position of the window addressed via its window handle
   *
   * @returns The {@link Region} occupied by the window addressed via its window handle
   */
  getWindowRegion(windowHandle: number): Promise<Region>;

  /**
   * {@link focusWindow} Focuses the window addressed via its window handle
   */
  focusWindow(windowHandle: number): Promise<boolean>;

  /**
   * {@link moveWindow} Moves the window addressed via its window handle to a new origin given as {@link Point}
   */
  moveWindow(windowHandle: number, newOrigin: Point): Promise<boolean>;

  /**
   * {@link resizeWindow} Resizes the window addressed via its window handle to a new {@link Size}
   */
  resizeWindow(windowHandle: number, newSize: Size): Promise<boolean>;
}
