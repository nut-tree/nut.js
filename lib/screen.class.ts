import { join, normalize } from "path";
import { NativeAdapter } from "./adapter/native.adapter.class";
import { VisionAdapter } from "./adapter/vision.adapter.class";
import { LocationParameters } from "./locationparameters.class";
import { MatchRequest } from "./match-request.class";
import { Region } from "./region.class";

export class Screen {
  public config = {
    confidence: 0.99,
    resourceDirectory: "./",
  };

  constructor(private vision: VisionAdapter, private native: NativeAdapter) {}

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
    const minMatch = (params && params.confidence) || this.config.confidence;
    const searchRegion =
      (params && params.searchRegion) || await this.native.screenSize();

    const fullPathToNeedle = normalize(join(this.config.resourceDirectory, pathToNeedle));
    console.log(`Full path to needle: ${fullPathToNeedle}`);

    const screenImage = await this.native.grabScreen();

    const matchRequest = new MatchRequest(
      screenImage,
      fullPathToNeedle,
      searchRegion,
      minMatch,
    );

    const matchResult = await this.vision.findOnScreenRegion(matchRequest);

    return new Promise<Region>((resolve, reject) => {
      if (matchResult.confidence >= minMatch) {
        resolve(matchResult.location);
      } else {
        reject(
          `No match for ${pathToNeedle}. Required: ${minMatch}, given: ${
            matchResult.confidence
          }`,
        );
      }
    });
  }
}
