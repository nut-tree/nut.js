import { Image } from "../../image.class";
import { Region } from "../../region.class";

/**
 * A ScreenActionProvider should provide access to a system's main screen
 *
 * @interface ScreenActionProvider
 */
export interface ScreenActionProvider {
  /**
   * grabScreen should return an Image object containing a screenshot data of a system's
   * main screen as well as its dimensions
   *
   * @returns {Promise<Image>} The Image object holding screenshot data
   * @memberof ScreenActionProvider
   */
  grabScreen(): Promise<Image>;

  /**
   * Returns the same result as grabScreen, but limited to a specified region
   *
   * @param {Region} region The region to take the screenshot of
   * @returns {Promise<Image>} The Image object holding screenshot data
   * @memberof ScreenActionProvider
   */
  grabScreenRegion(region: Region): Promise<Image>;

  /**
   * screenWidth returns a system's main screen width
   *
   * @returns {number} The screen width
   * @memberof ScreenActionProvider
   */
  screenWidth(): number;

  /**
   * screenHeight returns a system's main screen height
   *
   * @returns {number} The screen height
   * @memberof ScreenActionProvider
   */
  screenHeight(): number;

  /**
   * screenSize returns a Region object the size of a system's main screen
   *
   * @returns {Region} The Region object
   * @memberof ScreenActionProvider
   */
  screenSize(): Region;
}
