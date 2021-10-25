import { MatchRequest } from "../match-request.class";
import { MatchResult } from "../match-result.class";

/**
 * A Finder should provide an abstraction layer to perform
 * image processing and matching via a 3rd part library
 *
 * @interface ImageFinderInterface
 */
export interface ImageFinderInterface {
  /**
   * findMatch should provide an abstraction to search for an image needle
   * in another image haystack
   *
   * @param {MatchRequest} matchRequest A matchrequest containing needed matching data
   * @returns {Promise<MatchResult>} A matchresult containing the match probability and location
   * @memberof ImageFinderInterface
   */
  findMatch(matchRequest: MatchRequest): Promise<MatchResult>;

  /**
   * findMatches should provide an abstraction to search for an image needle
   * in another image haystack
   *
   * @param {MatchRequest} matchRequest A matchrequest containing needed matching data
   * @returns {Promise<MatchResult[]>} A list of matchresults containing the match probability and location
   * @memberof ImageFinderInterface
   */
  findMatches(matchRequest: MatchRequest): Promise<MatchResult[]>;
}
