import {LocationParameters} from "./locationparameters.class";
import {Region} from "./region.class";
import {ScreenClass} from "./screen.class";

export class AssertClass {
    constructor(private screen: ScreenClass) {
    }

    public async isVisible(pathToNeedle: string, searchRegion?: Region, confidence?: number) {
        try {
            await this.screen.find(
                pathToNeedle,
                {searchRegion, confidence} as LocationParameters,
            );
        } catch (err) {
            if (searchRegion !== undefined) {
                throw new Error(
                    `Element '${pathToNeedle}' not found in region ${searchRegion.toString()}. Reason: ${err}`,
                );
            } else {
                throw new Error(`Element '${pathToNeedle}' not found. Reason: ${err}`);
            }
        }
    }

    public async notVisible(pathToNeedle: string, searchRegion?: Region, confidence?: number) {
        try {
            await this.screen.find(
                pathToNeedle,
                {searchRegion, confidence} as LocationParameters,
            );
        } catch (err) {
            return;
        }
        throw new Error(`'${pathToNeedle}' is visible`);
    }
}
