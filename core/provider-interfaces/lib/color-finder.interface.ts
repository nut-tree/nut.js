import { ColorQuery, MatchRequest, MatchResult, Point } from "@nut-tree/shared";

/**
 * A WindowFinder should provide an abstraction layer to perform window searches
 *
 * @interface ColorFinderInterface
 */
export interface ColorFinderInterface {
  /**
   * findMatch should provide an abstraction to search for a color on screen
   *
   * @param {ColorQuery} query A {@link ColorQuery} containing needed data
   * @returns {Promise<number>} A single window handle
   * @memberof WindowFinderInterface
   */
  findMatch<PROVIDER_DATA_TYPE>(
    query: MatchRequest<ColorQuery, PROVIDER_DATA_TYPE>
  ): Promise<MatchResult<Point>>;

  /**
   * findMatches should provide an abstraction to search for a window on screen
   *
   * @param {ColorQuery} query A {@link ColorQuery} containing needed data
   * @returns {Promise<number[]>} A list of window handles
   * @memberof WindowFinderInterface
   */
  findMatches<PROVIDER_DATA_TYPE>(
    query: MatchRequest<ColorQuery, PROVIDER_DATA_TYPE>
  ): Promise<MatchResult<Point>[]>;
}
