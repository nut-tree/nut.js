import {Region} from "./region.class";
import {LocationParameters, Screen} from "./screen.class";

export class Assert {
    constructor(private screen: Screen) {
    }

    async isVisible(pathToNeedle: string, searchRegion?: Region) {
        try {
            await this.screen.findOnScreen(pathToNeedle, new LocationParameters(searchRegion));
        } catch (err) {
            if (searchRegion !== undefined) {
                throw new Error(`Element not found in region ${searchRegion.toString()}`);
            } else {
                throw new Error("Element not found.");
            }
        }
    }

    async notVisible(pathToNeedle: string, searchRegion?: Region) {
        try {
            await this.screen.findOnScreen(pathToNeedle, new LocationParameters(searchRegion));
        } catch (err) {
            return;
        }
        throw new Error("Element visible.");
    }
}
