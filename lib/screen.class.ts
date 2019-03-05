import { join, normalize } from "path";
import { cwd } from "process";
import { VisionAdapter } from "./adapter/vision.adapter.class";
import { FileType } from "./file-type.enum";
import { generateOutputPath } from "./generate-output-path.function";
import { LocationParameters } from "./locationparameters.class";
import { MatchRequest } from "./match-request.class";
import { Region } from "./region.class";

export class Screen {
  public config = {
    confidence: 0.99,
    resourceDirectory: "./",
  };

  constructor(private vision: VisionAdapter) {
  }

  public width() {
    return this.vision.screenWidth();
  }

  public height() {
    return this.vision.screenHeight();
  }

  public async find(
    pathToNeedle: string,
    params?: LocationParameters,
  ): Promise<Region> {
    const minMatch = (params && params.confidence) || this.config.confidence;
    const searchRegion =
      (params && params.searchRegion) || await this.vision.screenSize();

    const fullPathToNeedle = normalize(join(this.config.resourceDirectory, pathToNeedle));
    // console.log(`Full path to needle: ${fullPathToNeedle}`);

    const screenImage = await this.vision.grabScreen();

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

  public async capture(
    fileName: string,
    fileFormat: FileType = FileType.PNG,
    filePath: string = cwd(),
    fileNamePrefix: string = "",
    fileNamePostfix: string = ""): Promise<string> {
    const outputPath = generateOutputPath(fileName, {
      path: filePath,
      postfix: fileNamePostfix,
      prefix: fileNamePrefix,
      type: fileFormat,
    });

    const currentScreen = await this.vision.grabScreen();
    this.vision.saveImage(currentScreen, outputPath);
    return outputPath;
  }
}
