import { Region } from "./region.class";
import { AbortSignal } from "node-abort-controller";

/**
 * {@link OptionalSearchParameters} serves as a data class holding location parameters for image search
 */
export class OptionalSearchParameters {
  /**
   * {@link OptionalSearchParameters} class constructor
   * @param searchRegion Optional {@link Region} to limit the search space to
   * @param confidence Optional confidence value to configure image match confidence
   * @param searchMultipleScales Optional flag to indicate if the search should be conducted at different scales
   * @param abort An {@link AbortSignal} to cancel an ongoing call to `waitFor`
   */
  constructor(
    public searchRegion?: Region,
    public confidence?: number,
    public searchMultipleScales?: boolean,
    public abort?: AbortSignal
  ) {}
}
