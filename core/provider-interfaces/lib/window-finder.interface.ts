import { WindowQuery } from "@nut-tree/shared";

/**
 * A WindowFinder should provide an abstraction layer to perform window searches
 *
 * @interface WindowFinderInterface
 */
export interface WindowFinderInterface {
  /**
   * findMatch should provide an abstraction to search for a window on screen
   *
   * @param {WindowQuery} query A {@link WindowQuery} containing needed data
   * @returns {Promise<number>} A single window handle
   * @memberof WindowFinderInterface
   */
  findMatch(query: WindowQuery): Promise<number>;

  /**
   * findMatches should provide an abstraction to search for a window on screen
   *
   * @param {WindowQuery} query A {@link WindowQuery} containing needed data
   * @returns {Promise<number[]>} A list of window handles
   * @memberof WindowFinderInterface
   */
  findMatches(query: WindowQuery): Promise<number[]>;
}
