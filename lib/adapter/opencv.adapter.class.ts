import { Image } from "../image.class";
import { MatchResult } from "../matchresult.class";
import { OpenCV4NodeJSVisionProvider } from "../provider/opencv/opencv4nodejs.provider.class";
import { VisionProviderInterface } from "../provider/opencv/VisionProviderInterface";
import { Region } from "../region.class";

/**
 * OpenCVAdapter serves as an abstraction layer for all image based interactions.
 *
 * This allows to provide a high level interface for image based actions,
 * whithout having to spread (possibly) multiple dependencies all over the code.
 * All actions which involve screenshots / images are bundled in this adapter.
 */
export class OpenCVAdapter {
  constructor(
    private visionProvider: VisionProviderInterface = new OpenCV4NodeJSVisionProvider(),
  ) {}

  /**
   * findOnScreenRegion will search for a given pattern inside a region of an image.
   * If multiple possible occurences are found, the one with the highes probability is returned.
   * For matchProbability < 0.99 the search will be performed on grayscale images.
   *
   * @param {Image} screen The haystack to search to search a needle in
   * @param {string} pathToNeedle Path to the image "needle"
   * @param {Region} searchRegion Search region to limit search
   * @param {number} matchProbability Matchprobability, used to decide whether to search on grayscale images or not
   * @returns {Promise<MatchResult>} MatchResult will contain location and probability of a possible match
   * @memberof OpenCVAdapter
   */
  public async findOnScreenRegion(
    screen: Image,
    pathToNeedle: string,
    searchRegion: Region,
    matchProbability: number,
  ): Promise<MatchResult> {
    let needle = await this.visionProvider.loadImage(pathToNeedle);
    let haystack = await this.visionProvider.fromImageWithoutAlphaChannel(
      screen,
      searchRegion,
    );

    if (matchProbability < 0.99) {
      needle = await this.visionProvider.rgbToGrayScale(needle);
      haystack = await this.visionProvider.rgbToGrayScale(haystack);
    }

    const matchResult = await this.visionProvider.findMatch(needle, haystack);
    return Promise.resolve(matchResult);
  }
}
