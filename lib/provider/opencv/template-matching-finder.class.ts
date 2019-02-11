import * as cv from "opencv4nodejs";
import { Image } from "../../image.class";
import { MatchRequest } from "../../match-request.class";
import { MatchResult } from "../../match-result.class";
import { Region } from "../../region.class";
import { FinderInterface } from "./finder.interface";

export class TemplateMatchingFinder implements FinderInterface {
  private static scaleStep = 0.5;

  private static async dropAlphaChannel(img: cv.Mat): Promise<cv.Mat> {
    if (img.channels === 4) {
      return img.cvtColorAsync(cv.COLOR_BGRA2BGR);
    } else {
      return Promise.resolve(img);
    }
  }

  constructor() {}

  public async findMatches(matchRequest: MatchRequest): Promise<MatchResult[]> {
    let needle = await this.loadImage(matchRequest.pathToNeedle);
    if (needle.empty) {
      throw new Error(`Failed to load ${matchRequest.pathToNeedle}, got empty image.`);
    }
    let haystack = await this.loadHaystack(matchRequest);

    if (matchRequest.confidence < 0.99) {
      needle = await this.rgbToGrayScale(needle);
      haystack = await this.rgbToGrayScale(haystack);
    }
    cv.imwriteAsync(`${"input_needle.png"}`, needle);
    cv.imwriteAsync(`${"input_haystack.png"}`, haystack);

    const matchResults = [];
    matchResults.push(await this.match(haystack, needle));
    if (matchRequest.searchMultipleScales) {
      matchResults.push(await this.scaleAndMatchHaystack(haystack, needle));
      matchResults.push(await this.scaleAndMatchNeedle(haystack, needle));
    }

    // Compensate pixel density
    matchResults.map(matchResult => {
      matchResult.location.left /= matchRequest.haystack.pixelDensity.scaleX;
      matchResult.location.width /= matchRequest.haystack.pixelDensity.scaleX;
      matchResult.location.top /= matchRequest.haystack.pixelDensity.scaleY;
      matchResult.location.height /= matchRequest.haystack.pixelDensity.scaleY;
    });

    return matchResults.sort(
      (first, second) => second.confidence - first.confidence,
    );
  }

  public async findMatch(matchRequest: MatchRequest): Promise<MatchResult> {
    const matches = await this.findMatches(matchRequest);
    if (matches.length === 0) {
      throw new Error(
        `Unable to locate ${matchRequest.pathToNeedle}, no match!`,
      );
    }
    return matches[0];
  }

  public async loadImage(imagePath: string): Promise<cv.Mat> {
    return cv.imreadAsync(imagePath);
  }

  public async fromImageWithAlphaChannel(
    img: Image,
    roi?: Region,
  ): Promise<cv.Mat> {
    const mat = new cv.Mat(img.data, img.height, img.width, cv.CV_8UC4);
    if (roi) {
      return Promise.resolve(
        mat.getRegion(new cv.Rect(roi.left, roi.top, roi.width, roi.height)),
      );
    } else {
      return Promise.resolve(mat);
    }
  }

  public async loadImageWithAlphaChannel(imagePath: string): Promise<cv.Mat> {
    const image = await this.loadImage(imagePath);
    if (image.channels < 4) {
      return image.cvtColorAsync(cv.COLOR_BGR2BGRA);
    }
    return Promise.resolve(image);
  }

  public async loadImageWithoutAlphaChannel(path: string): Promise<cv.Mat> {
    const image = await this.loadImage(path);
    return Promise.resolve(TemplateMatchingFinder.dropAlphaChannel(image));
  }

  public async rgbToGrayScale(img: cv.Mat): Promise<cv.Mat> {
    return img.cvtColorAsync(cv.COLOR_BGR2GRAY);
  }

  public async fromImageWithoutAlphaChannel(
    img: Image,
    roi?: Region,
  ): Promise<cv.Mat> {
    const newMat = await this.fromImageWithAlphaChannel(img, roi);
    if (newMat.channels > 3) {
      return newMat.cvtColorAsync(cv.COLOR_BGRA2BGR);
    }
    return Promise.resolve(newMat);
  }

  private async loadHaystack(matchRequest: MatchRequest): Promise<cv.Mat> {
    const searchRegion = this.determineScaledSearchRegion(matchRequest);
    if (matchRequest.haystack.hasAlphaChannel) {
      return await this.fromImageWithAlphaChannel(
        matchRequest.haystack,
        searchRegion,
      );
    } else {
      return await this.fromImageWithoutAlphaChannel(
        matchRequest.haystack,
        searchRegion,
      );
    }
  }

  private determineScaledSearchRegion(matchRequest: MatchRequest): Region {
    const searchRegion = matchRequest.searchRegion;
    searchRegion.width *= matchRequest.haystack.pixelDensity.scaleX;
    searchRegion.height *= matchRequest.haystack.pixelDensity.scaleY;
    return searchRegion;
  }

  private async scaleAndMatchHaystack(
    haystack: cv.Mat,
    needle: cv.Mat,
  ): Promise<MatchResult> {
    const scaledHaystack = await this.scale(
      haystack,
      TemplateMatchingFinder.scaleStep,
    );
    const matchResult = await this.match(scaledHaystack, needle);
    cv.imwriteAsync(`${"scaled_haystack.png"}`, scaledHaystack);
    console.log(`Scaled haystack: ${matchResult.confidence}`);
    return new MatchResult(
      matchResult.confidence,
      new Region(
        matchResult.location.left / TemplateMatchingFinder.scaleStep,
        matchResult.location.top / TemplateMatchingFinder.scaleStep,
        needle.cols,
        needle.rows,
      ),
    );
  }

  private async scaleAndMatchNeedle(
    haystack: cv.Mat,
    needle: cv.Mat,
  ): Promise<MatchResult> {
    const scaledNeedle = await this.scale(
      needle,
      TemplateMatchingFinder.scaleStep,
    );
    const matchResult = await this.match(haystack, scaledNeedle);
    cv.imwriteAsync(`${"scaled_needle.png"}`, scaledNeedle);
    console.log(`Scaled needle: ${matchResult.confidence}`);
    return new MatchResult(
      matchResult.confidence,
      new Region(
        matchResult.location.left,
        matchResult.location.top,
        scaledNeedle.cols,
        scaledNeedle.rows,
      ),
    );
  }

  private async match(haystack: cv.Mat, needle: cv.Mat): Promise<MatchResult> {
    const match = await haystack.matchTemplateAsync(
      needle,
      cv.TM_SQDIFF_NORMED,
    );
    const minMax = await match.minMaxLocAsync();
    return new MatchResult(
      1.0 - minMax.minVal,
      new Region(minMax.minLoc.x, minMax.minLoc.y, needle.cols, needle.rows),
    );
  }

  private async scale(image: cv.Mat, scaleFactor: number): Promise<cv.Mat> {
    const scaledRows = Math.max(Math.floor(image.rows * scaleFactor), 1.0);
    const scaledCols = Math.max(Math.floor(image.cols * scaleFactor), 1.0);
    return image.resizeAsync(scaledRows, scaledCols, 0, 0, cv.INTER_AREA);
  }
}
