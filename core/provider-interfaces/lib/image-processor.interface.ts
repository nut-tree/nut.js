import { Image, Point, RGBA } from "@nut-tree/shared";

/**
 * An ImageProcessor should provide an abstraction layer to perform
 * image processing via a 3rd part library
 *
 * @interface ImageFinderInterface
 */
export interface ImageProcessor {
  /**
   * {@link colorAt} returns a pixels {@link RGBA} value
   * @param image The {@link Image} to query color information from
   * @param location The {@link Point} where to query color information
   */
  colorAt(
    image: Image | Promise<Image>,
    location: Point | Promise<Point>
  ): Promise<RGBA>;
}
