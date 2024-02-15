import { Region } from "./region.class";
import { AbortSignal } from "node-abort-controller";

/**
 * {@link OptionalSearchParameters} serves as a data class holding optional parameters for search purposes
 */
export class OptionalSearchParameters<PROVIDER_DATA_TYPE> {
  /**
   * {@link OptionalSearchParameters} class constructor
   * @param searchRegion Optional {@link Region} to limit the search space to
   * @param confidence Optional confidence value to configure image or text match confidence
   * @param abort An {@link AbortSignal} to cancel an ongoing call to `waitFor`
   * @param providerData Optional data that gets passed onto the provider implementation
   */
  constructor(
    public searchRegion?: Region | Promise<Region>,
    public confidence?: number,
    public abort?: AbortSignal,
    public providerData?: PROVIDER_DATA_TYPE
  ) {
  }
}
