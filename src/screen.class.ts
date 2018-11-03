import {Region} from "./region.class";
import {Config} from "./nut";
import {OpenCVAdapter} from "./adapter/opencv.adapter.class";
import {NativeAdapter} from "./adapter/native.adapter.class";

export class LocationParameters {
    constructor(public searchRegion?: Region, public matchProbability?: number) { }
}

export class Screen {
    constructor(private config: Config, private vision: OpenCVAdapter, private native: NativeAdapter) {
    }

    width() {
        return this.native.screenWidth();
    }

    height() {
        return this.native.screenHeight();
    }

    async findOnScreen(pathToNeedle: string, params?: LocationParameters): Promise<Region> {
        const minMatch = (params && params.matchProbability) || this.config.matchProbability;
        const searchRegion = (params && params.searchRegion) || this.native.screenSize();

        const screenImage = await this.native.grabScreen();
        const matchResult = await this.vision.findOnScreenRegion(screenImage, pathToNeedle, searchRegion, minMatch);

        return new Promise<Region>((resolve, reject) => {
            if (matchResult.probability >= minMatch) {
                resolve(matchResult.location);
            } else {
                reject(`No matching pattern for ${pathToNeedle} found. Required match: ${minMatch}, given: ${matchResult.probability}`);
            }
        });
    }
}
