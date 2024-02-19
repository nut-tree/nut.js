import { FindInput, OptionalSearchParameters, Region } from "@nut-tree/shared";
import { ScreenClass } from "./screen.class";

export class AssertClass {
  constructor(private screen: ScreenClass) {
  }

  public async isVisible(
    searchInput: FindInput | Promise<FindInput>,
    searchRegion?: Region | Promise<Region>,
    confidence?: number
  ): Promise<void> {
    const needle = await searchInput;
    const identifier = needle.id;

    try {
      await this.screen.find(needle, {
        searchRegion,
        confidence
      } as OptionalSearchParameters<never>);
    } catch (err) {
      if (searchRegion !== undefined) {
        throw new Error(
          `Element '${identifier}' not found in region ${searchRegion.toString()}. Reason: ${err}`
        );
      } else {
        throw new Error(`Element '${identifier}' not found. Reason: ${err}`);
      }
    }
  }

  public async notVisible(
    searchInput: FindInput | Promise<FindInput>,
    searchRegion?: Region | Promise<Region>,
    confidence?: number
  ) {
    const needle = await searchInput;
    const identifier = needle.id;

    try {
      await this.screen.find(needle, {
        searchRegion,
        confidence
      } as OptionalSearchParameters<never>);
    } catch (err) {
      return;
    }
    throw new Error(`'${identifier}' is visible`);
  }
}
