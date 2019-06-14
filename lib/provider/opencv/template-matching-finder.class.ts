import * as cv from "opencv4nodejs-prebuilt";
import * as path from "path";
import { Image } from "../../image.class";
import { MatchRequest } from "../../match-request.class";
import { MatchResult } from "../../match-result.class";
import { Region } from "../../region.class";
import { ScaledMatchResult } from "../../scaled-match-result.class";
import { DataSource } from "./data-source.interface";
import { FinderInterface } from "./finder.interface";
import { ImageProcessor } from "./image-processor.class";
import { ImageReader } from "./image-reader.class";

const loadNeedle = async (image: Image): Promise<cv.Mat> => {
  if (image.hasAlphaChannel) {
    return ImageProcessor.fromImageWithAlphaChannel(image);
  }
  return ImageProcessor.fromImageWithoutAlphaChannel(image);
};

const loadHaystack = async (matchRequest: MatchRequest): Promise<cv.Mat> => {
  const searchRegion = determineScaledSearchRegion(matchRequest);
  if (matchRequest.haystack.hasAlphaChannel) {
    return ImageProcessor.fromImageWithAlphaChannel(
      matchRequest.haystack,
      searchRegion,
    );
  } else {
    return ImageProcessor.fromImageWithoutAlphaChannel(
      matchRequest.haystack,
      searchRegion,
    );
  }
};

const matchImages = async (haystack: cv.Mat, needle: cv.Mat): Promise<MatchResult> => {
  const match = await haystack.matchTemplateAsync(
    needle,
    cv.TM_SQDIFF_NORMED,
  );
  const minMax = await match.minMaxLocAsync();
  return new MatchResult(
    1.0 - minMax.minVal,
    new Region(
      minMax.minLoc.x,
      minMax.minLoc.y,
      Math.min(needle.cols, haystack.cols),
      Math.min(needle.rows, haystack.rows),
    ),
  );
};

const scaleImage = async (image: cv.Mat, scaleFactor: number): Promise<cv.Mat> => {
  const scaledRows = Math.max(Math.floor(image.rows * scaleFactor), 1.0);
  const scaledCols = Math.max(Math.floor(image.cols * scaleFactor), 1.0);
  return image.resizeAsync(scaledRows, scaledCols, 0, 0, cv.INTER_AREA);
};

const determineScaledSearchRegion = (matchRequest: MatchRequest): Region => {
  const searchRegion = matchRequest.searchRegion;
  searchRegion.width *= matchRequest.haystack.pixelDensity.scaleX;
  searchRegion.height *= matchRequest.haystack.pixelDensity.scaleY;
  return searchRegion;
};

const debugImage = (image: cv.Mat, filename: string, suffix?: string) => {
  const parsedPath = path.parse(filename);
  let fullFilename = parsedPath.name;
  if (suffix) {
    fullFilename = fullFilename + "_" + suffix;
  }
  fullFilename += parsedPath.ext;
  const fullPath = path.join(parsedPath.dir, fullFilename);
  cv.imwriteAsync(fullPath, image);
};

// const debugResult = (image: cv.Mat, result: MatchResult, filename: string, suffix?: string) => {
//   const roiRect = new cv.Rect(
//     Math.min(Math.max(result.location.left, 0), image.cols),
//     Math.min(Math.max(result.location.top, 0), image.rows),
//     Math.min(result.location.width, image.cols - result.location.left),
//     Math.min(result.location.height, image.rows - result.location.top));
//   debugImage(image.getRegion(roiRect), filename, suffix);
// };
//
// const findEdges = async (image: cv.Mat): Promise<cv.Mat> => {
//   const gray = await image.cvtColorAsync(cv.COLOR_BGR2GRAY);
//   return gray.cannyAsync(50, 200);
// };

const scaleSize = (
  result: Region,
  scaleFactor: number,
): Region => {
  return new Region(
    result.left,
    result.top,
    result.width / scaleFactor,
    result.height / scaleFactor,
  );
};

const scaleLocation = (
  result: Region,
  scaleFactor: number,
): Region => {
  return new Region(
    result.left / scaleFactor,
    result.top / scaleFactor,
    result.width,
    result.height,
  );
};

const isValidSearch = (needle: cv.Mat, haystack: cv.Mat): boolean => {
  return (needle.cols <= haystack.cols) && (needle.rows <= haystack.rows);
};

export class TemplateMatchingFinder implements FinderInterface {
  private initialScale = [1.0];
  private scaleSteps = [0.9, 0.8, 0.7, 0.6, 0.5];

  constructor(
    private source: DataSource = new ImageReader(),
  ) {
  }

  public async findMatches(matchRequest: MatchRequest, debug: boolean = false): Promise<ScaledMatchResult[]> {
    let needle: cv.Mat;
    try {
      const needleInput = await this.source.load(matchRequest.pathToNeedle);
      needle = await loadNeedle(needleInput);
    } catch (e) {
      throw new Error(
        `Failed to load ${matchRequest.pathToNeedle}. Reason: '${e}'.`,
      );
    }
    if (!needle || needle.empty) {
      throw new Error(
        `Failed to load ${matchRequest.pathToNeedle}, got empty image.`,
      );
    }
    const haystack = await loadHaystack(matchRequest);

    if (debug) {
      debugImage(needle, "input_needle.png");
      debugImage(haystack, "input_haystack.png");
    }

    const matchResults = this.initialScale.map(
      async (currentScale) => {
        if (!isValidSearch(needle, haystack)) {
          return new ScaledMatchResult(0,
            currentScale,
            new Region(
              0,
              0,
              0,
              0
            )
          );
        }
        const matchResult = await matchImages(haystack, needle);
        return new ScaledMatchResult(matchResult.confidence, currentScale, matchResult.location);
      }
    );
    if (matchRequest.searchMultipleScales) {
      const scaledNeedleResult = this.scaleSteps.map(
        async (currentScale) => {
          const scaledNeedle = await scaleImage(needle, currentScale);
          if (!isValidSearch(scaledNeedle, haystack)) {
            return new ScaledMatchResult(0,
              currentScale,
              new Region(
                0,
                0,
                0,
                0
              )
            );
          }
          const matchResult = await matchImages(haystack, scaledNeedle);
          return new ScaledMatchResult(
            matchResult.confidence,
            currentScale,
            scaleSize(
              matchResult.location,
              currentScale
            )
          );
        }
      );
      const scaledHaystackResult = this.scaleSteps.map(
        async (currentScale) => {
          const scaledHaystack = await scaleImage(haystack, currentScale);
          if (!isValidSearch(needle, scaledHaystack)) {
            return new ScaledMatchResult(0,
              currentScale,
              new Region(
                0,
                0,
                0,
                0
              )
            );
          }
          const matchResult = await matchImages(scaledHaystack, needle);
          return new ScaledMatchResult(
            matchResult.confidence,
            currentScale,
            scaleLocation(
              matchResult.location,
              currentScale
            )
          );
        }
      );
      matchResults.push(...scaledHaystackResult, ...scaledNeedleResult);
    }

    return Promise.all(matchResults).then(results => {
      results.forEach(matchResult => {
        matchResult.location.left /= matchRequest.haystack.pixelDensity.scaleX;
        matchResult.location.width /= matchRequest.haystack.pixelDensity.scaleX;
        matchResult.location.top /= matchRequest.haystack.pixelDensity.scaleY;
        matchResult.location.height /= matchRequest.haystack.pixelDensity.scaleY;
      });
      return results.sort(
        (first, second) => second.confidence - first.confidence,
      );
    });
  }

  public async findMatch(matchRequest: MatchRequest, debug: boolean = false): Promise<MatchResult> {
    return new Promise<MatchResult>(async (resolve, reject) => {
      try {
        const matches = await this.findMatches(matchRequest, debug);
        const potentialMatches = matches
          .filter(match => match.confidence >= matchRequest.confidence)
          .sort((first, second) => first.scale - second.scale);
        if (potentialMatches.length === 0) {
          reject(`Unable to locate ${matchRequest.pathToNeedle}, no match!`);
        }
        resolve(potentialMatches.pop());
      } catch (e) {
        reject(e);
      }
    });
  }

}
