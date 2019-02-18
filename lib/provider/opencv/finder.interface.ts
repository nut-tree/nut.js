import { Image } from "../../image.class";
import { MatchRequest } from "../../match-request.class";
import { MatchResult } from "../../match-result.class";
import { Region } from "../../region.class";

/**
 * A Finder should provide an abstraction layer to perform
 * image processing and matching via a 3rd part library
 *
 * @interface FinderInterface
 */
export interface FinderInterface {
  /**
   * loadImage should allow to load an image from filesystem
   *
   * @param {string} path The filesystem path to the image
   * @returns {*} An image
   * @memberof VisionProviderInterface
   */
  loadImage(path: string): any;

  /**
   * findMatch should provide an abstraction to search for an image needle
   * in another image haystack
   *
   * @param {MatchRequest} matchRequest A matchrequest containing needed matching data
   * @returns {Promise<MatchResult>} A matchresult containing the match probability and location
   * @memberof FinderInterface
   */
  findMatch(matchRequest: MatchRequest): Promise<MatchResult>;

  /**
   * findMatches should provide an abstraction to search for an image needle
   * in another image haystack
   *
   * @param {MatchRequest} matchRequest A matchrequest containing needed matching data
   * @returns {Promise<MatchResult[]>} A list of matchresults containing the match probability and location
   * @memberof FinderInterface
   */
  findMatches(matchRequest: MatchRequest): Promise<MatchResult[]>;

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
