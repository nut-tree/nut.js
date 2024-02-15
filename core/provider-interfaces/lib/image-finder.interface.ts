import { Image, MatchRequest, MatchResult, Region } from "@nut-tree/shared";

/**
 * An ImageFinder should provide an abstraction layer to perform image matching
 *
 * @interface ImageFinderInterface
 */
export interface ImageFinderInterface {
  /**
   * findMatch should provide an abstraction to search for an image needle
   * in another image haystack
   *
   * @param {MatchRequest} matchRequest A {@link MatchRequest} containing needed matching data
   * @returns {Promise<MatchResult>} A {@link MatchResult} holding the match probability and location
   * @memberof ImageFinderInterface
   */
  findMatch<PROVIDER_DATA_TYPE>(
    matchRequest: MatchRequest<Image, PROVIDER_DATA_TYPE>
  ): Promise<MatchResult<Region>>;

  /**
   * findMatches should provide an abstraction to search for an image needle
   * in another image haystack
   *
   * @param {MatchRequest} matchRequest A match request containing needed matching data
   * @returns {Promise<MatchResult[]>} A list of {@link MatchResult}s holding the match probability and location
   * @memberof ImageFinderInterface
   */
  findMatches<PROVIDER_DATA_TYPE>(
    matchRequest: MatchRequest<Image, PROVIDER_DATA_TYPE>
  ): Promise<MatchResult<Region>[]>;
}
