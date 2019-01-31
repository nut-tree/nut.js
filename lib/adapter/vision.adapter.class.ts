import { MatchRequest } from "../match-request.class";
import { MatchResult } from "../match-result.class";
import { FinderInterface } from "../provider/opencv/finder.interface";
import { TemplateMatchingFinder } from "../provider/opencv/template-matching-finder.class";

/**
 * OpenCVAdapter serves as an abstraction layer for all image based interactions.
 *
 * This allows to provide a high level interface for image based actions,
 * whithout having to spread (possibly) multiple dependencies all over the code.
 * All actions which involve screenshots / images are bundled in this adapter.
 */
export class VisionAdapter {
  constructor(private finder: FinderInterface = new TemplateMatchingFinder()) {}

  /**
   * findOnScreenRegion will search for a given pattern inside a region of an image.
   * If multiple possible occurences are found, the one with the highes probability is returned.
   * For matchProbability < 0.99 the search will be performed on grayscale images.
   *
   * @param {MatchRequest} matchRequest A match request which holds all required matching data
   * @returns {Promise<MatchResult>} MatchResult will contain location and probability of a possible match
   * @memberof OpenCVAdapter
   */
  public async findOnScreenRegion(
    matchRequest: MatchRequest,
  ): Promise<MatchResult> {
    const matchResult = await this.finder.findMatch(matchRequest);
    return Promise.resolve(matchResult);
  }
}
