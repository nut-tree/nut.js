import { Image } from "../image.class";
import { MatchResult } from "../matchresult.class";
import { OpenCV4NodeJSVisionProvider } from "../provider/opencv/opencv4nodejs.provider.class";
import { VisionProviderInterface } from "../provider/opencv/VisionProviderInterface";
import { Region } from "../region.class";

export class OpenCVAdapter {
  constructor(
    private visionProvider: VisionProviderInterface = new OpenCV4NodeJSVisionProvider()
  ) {}

  public async findOnScreenRegion(
    screen: Image,
    pathToNeedle: string,
    searchRegion: Region,
    matchProbability: number
  ): Promise<MatchResult> {
    let needle = await this.visionProvider.loadImage(pathToNeedle);
    let haystack = await this.visionProvider.fromImageWithoutAlphaChannel(
      screen,
      searchRegion
    );

    if (matchProbability < 0.99) {
      needle = await this.visionProvider.rgbToGrayScale(needle);
      haystack = await this.visionProvider.rgbToGrayScale(haystack);
    }

    const matchResult = await this.visionProvider.findMatch(needle, haystack);
    return Promise.resolve(matchResult);
  }
}
