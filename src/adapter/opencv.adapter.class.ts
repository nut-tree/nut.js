import {Region} from "../region.class";
import {MatchResult} from "../matchresult.class";
import {Image} from "../image.class";
import {OpenCVProviderInterface} from "../provider/opencv/opencv.provider.interface";

export class OpenCVAdapter {
    constructor(private visionProvider: OpenCVProviderInterface) {
    }

    async findOnScreenRegion(screen: Image, pathToNeedle: string, searchRegion: Region, matchProbability: number): Promise<MatchResult> {
        let needle = await this.visionProvider.loadImage(pathToNeedle);
        let haystack = await this.visionProvider.fromImage(
            screen
        );

        if (matchProbability < 0.99) {
            needle = await this.visionProvider.rgbToGrayScale(needle);
            haystack = await this.visionProvider.rgbToGrayScale(haystack);
        }

        const matchResult = await this.visionProvider.findMatch(needle, haystack);
        return Promise.resolve(matchResult);
    }
}
