import { MatchRequest, MatchResult, Region, TextQuery } from "@nut-tree/shared";

/**
 * A TextFinder should provide an abstraction layer to perform text searches
 *
 * @interface TextFinderInterface
 */
export interface TextFinderInterface {
  /**
   * findMatch should provide an abstraction to search for an image needle
   * in another image haystack
   *
   * @param {MatchRequest} matchRequest A {@link MatchRequest} containing needed matching data
   * @returns {Promise<MatchResult>} A {@link MatchResult} holding the match probability and location
   * @memberof TextFinderInterface
   */
  findMatch<PROVIDER_DATA_TYPE>(
    matchRequest: MatchRequest<TextQuery, PROVIDER_DATA_TYPE>
  ): Promise<MatchResult<Region>>;

  /**
   * findMatches should provide an abstraction to search for an image needle
   * in another image haystack
   *
   * @param {MatchRequest} matchRequest A {@link MatchRequest} containing needed matching data
   * @returns {Promise<MatchResult[]>} A list of {@link MatchResult}s holding the match probability and location
   * @memberof TextFinderInterface
   */
  findMatches<PROVIDER_DATA_TYPE>(
    matchRequest: MatchRequest<TextQuery, PROVIDER_DATA_TYPE>
  ): Promise<MatchResult<Region>[]>;
}
