import {NativeAdapter} from "./adapter/native.adapter.class";
import {OpenCVAdapter} from "./adapter/opencv.adapter.class";
import {Config} from "./config.class";
import {Image} from "./image.class";
import {LocationParameters} from "./locationparameters.class";
import {Region} from "./region.class";

export class Screen {

    constructor(private config: Config, private vision: OpenCVAdapter, private native: NativeAdapter) {
    }

    public width() {
        return this.native.screenWidth();
    }

    public height() {
        return this.native.screenHeight();
    }

    public async findOnScreen(pathToNeedle: string, params?: LocationParameters): Promise<Region> {
        const minMatch = (params && params.matchProbability) || this.config.matchProbability;
        const searchRegion = (params && params.searchRegion) || this.native.screenSize();

        const screenImage = await this.native.grabScreen();
        const matchResult = await this.vision.findOnScreenRegion(screenImage, pathToNeedle, searchRegion, minMatch);

        return new Promise<Region>((resolve, reject) => {
            if (matchResult.probability >= minMatch) {
                // Take scaling on HDPI displays (e.g. Apples Retina display) into account
                resolve(Region.scaled(
                    matchResult.location,
                    this.calculateHorizontalScaling(screenImage),
                    this.calculateVerticalScaling(screenImage)));
            } else {
                reject(`No match for ${pathToNeedle}. Required: ${minMatch}, given: ${matchResult.probability}`);
            }
        });
    }

    private calculateHorizontalScaling(screenShot: Image): number {
        return (this.width() / screenShot.width) || 1.0;
    }

    private calculateVerticalScaling(screenShot: Image): number {
        return (this.height() / screenShot.height) || 1.0;
    }
}
