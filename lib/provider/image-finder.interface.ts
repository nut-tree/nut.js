import { MatchRequest } from "../match-request.class";
import { MatchResult } from "../match-result.class";

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
  findMatch(matchRequest: MatchRequest): Promise<MatchResult>;

  /**
   * findMatches should provide an abstraction to search for an image needle
   * in another image haystack
   *
   * @param {MatchRequest} matchRequest A matchrequest containing needed matching data
   * @returns {Promise<MatchResult[]>} A list of {@link MatchResult}s holding the match probability and location
   * @memberof ImageFinderInterface
   */
  findMatches(matchRequest: MatchRequest): Promise<MatchResult[]>;
}
