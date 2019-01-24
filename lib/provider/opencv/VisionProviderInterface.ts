import { Image } from "../../image.class";
import { MatchResult } from "../../matchresult.class";
import { Region } from "../../region.class";

/**
 * A VisionProvider should provide an abstraction layer to perform
 * image processing via a 3rd part library
 *
 * @interface VisionProviderInterface
 */
export interface VisionProviderInterface {
  /**
   * loadImage should allow to load an image from filesystem
   *
   * @param {string} path The filesystem path to the image
   * @returns {*} An image
   * @memberof VisionProviderInterface
   */
  loadImage(path: string): any;

  /**
   * loadImageWithAlphaChannel should allow to load an image with alpha channel
   * If the image to load does not yet have an alpha channel,
   * one should be created
   *
   * @param {string} path The filesystem path to the image
   * @returns {*} An image
   * @memberof VisionProviderInterface
   */
  loadImageWithAlphaChannel(path: string): any;

  /**
   * loadImageWithoutAlphaChannel should load an image without alpha channel
   * If the image to load has an alpha channel, it should be dropped
   *
   * @param {string} path The filesystem path to the image
   * @returns {*} An image
   * @memberof VisionProviderInterface
   */
  loadImageWithoutAlphaChannel(path: string): any;

  /**
   * findMatch should provide an abstraction to search for an image needle
   * in another image haystack
   *
   * @param {*} needle An image to search for
   * @param {*} haystack An image to search in
   * @returns {Promise<MatchResult>} A matchresult containing the match probability and location
   * @memberof VisionProviderInterface
   */
  findMatch(needle: any, haystack: any): Promise<MatchResult>;

  /**
   * fromImageWithAlphaChannel should provide a way to create a library specific
   * image with alpha channel from an abstract Image object holding raw data and image dimension
   *
   * @param {Image} img The input Image
   * @param {Region} [roi] An optional Region to specify a ROI
   * @returns {Promise<any>} An image
   * @memberof VisionProviderInterface
   */
  fromImageWithAlphaChannel(img: Image, roi?: Region): Promise<any>;

  /**
   * fromImageWithoutAlphaChannel should provide a way to create a library specific
   * image without alpha channel from an abstract Image object holding raw data and image dimension
   *
   * @param {Image} img The input Image
   * @param {Region} [roi] An optional Region to specify a ROI
   * @returns {Promise<any>} An image
   * @memberof VisionProviderInterface
   */
  fromImageWithoutAlphaChannel(img: Image, roi?: Region): Promise<any>;

  /**
   * rgbToGrayScale should provide a way to convert an image from RGB to grayscale
   *
   * @param {*} img Input image, RGB
   * @returns {Promise<any>} Output image, grayscale
   * @memberof VisionProviderInterface
   */
  rgbToGrayScale(img: any): Promise<any>;
}
