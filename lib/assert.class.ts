import {LocationParameters} from "./locationparameters.class";
import {Region} from "./region.class";
import {ScreenClass} from "./screen.class";
import {FirstArgumentType} from "./typings";

export class AssertClass {
    constructor(private screen: ScreenClass) {
    }

    public async isVisible(needle: FirstArgumentType<typeof ScreenClass.prototype.find>, searchRegion?: Region, confidence?: number) {
        const identifier = (await needle).id;

        try {
            await this.screen.find(
                needle,
                {searchRegion, confidence} as LocationParameters,
            );
        } catch (err) {
            if (searchRegion !== undefined) {
                throw new Error(
                    `Element '${identifier}' not found in region ${searchRegion.toString()}. Reason: ${err}`,
                );
            } else {
                throw new Error(`Element '${identifier}' not found. Reason: ${err}`);
            }
        }
    }

    public async notVisible(needle: FirstArgumentType<typeof ScreenClass.prototype.find>, searchRegion?: Region, confidence?: number) {
        const identifier = (await needle).id;

        try {
            await this.screen.find(
                needle,
                {searchRegion, confidence} as LocationParameters,
            );
        } catch (err) {
            return;
        }
        throw new Error(`'${identifier}' is visible`);
    }
}
