import { NativeAdapter } from "./adapter/native.adapter.class";
import { VisionAdapter } from "./adapter/vision.adapter.class";
import { Config } from "./config.class";
import { Image } from "./image.class";
import { LocationParameters } from "./locationparameters.class";
import { MatchRequest } from "./match-request.class";
import { Region } from "./region.class";

export class Screen {
  constructor(
    private config: Config,
    private vision: VisionAdapter,
    private native: NativeAdapter,
  ) {}

  public width() {
    return this.native.screenWidth();
  }

  public height() {
    return this.native.screenHeight();
  }

  public async findOnScreen(
    pathToNeedle: string,
    params?: LocationParameters,
  ): Promise<Region> {
    const minMatch =
      (params && params.matchProbability) || this.config.matchProbability;
    const searchRegion =
      (params && params.searchRegion) || this.native.screenSize();

    const screenImage = await this.native.grabScreen();

    const matchRequest = new MatchRequest(
      screenImage,
      pathToNeedle,
      Region.scaled(
        searchRegion,
        1.0 / this.calculateHorizontalScaling(screenImage),
        1.0 / this.calculateVerticalScaling(screenImage),
      ),
      minMatch,
    );

    const matchResult = await this.vision.findOnScreenRegion(matchRequest);

    return new Promise<Region>((resolve, reject) => {
      if (matchResult.confidence >= minMatch) {
        // Take scaling on HDPI displays (e.g. Apples Retina display) into account
        resolve(
          Region.scaled(
            matchResult.location,
            this.calculateHorizontalScaling(screenImage),
            this.calculateVerticalScaling(screenImage),
          ),
        );
      } else {
        reject(
          `No match for ${pathToNeedle}. Required: ${minMatch}, given: ${
            matchResult.confidence
          }`,
        );
      }
    });
  }

  private calculateHorizontalScaling(screenShot: Image): number {
    return this.width() / screenShot.width || 1.0;
  }

  private calculateVerticalScaling(screenShot: Image): number {
    return this.height() / screenShot.height || 1.0;
  }
}
