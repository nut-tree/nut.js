import { ColorFinderInterface } from "@nut-tree/provider-interfaces";
import { ColorQuery, imageToJimp, MatchRequest, MatchResult, Point } from "@nut-tree/shared";

export default class implements ColorFinderInterface {
  async findMatch<PROVIDER_DATA_TYPE>(
    query: MatchRequest<ColorQuery, PROVIDER_DATA_TYPE>
  ): Promise<MatchResult<Point>> {
    const jimp = imageToJimp(query.haystack);
    let result: MatchResult<Point> | null = null;
    const color = query.needle.by.color;
    for (const { x, y, idx } of jimp.scanIterator(
      0,
      0,
      jimp.bitmap.width,
      jimp.bitmap.height
    )) {
      if (
        jimp.bitmap.data[idx] === color.R &&
        jimp.bitmap.data[idx + 1] === color.G &&
        jimp.bitmap.data[idx + 2] === color.B &&
        jimp.bitmap.data[idx + 3] === color.A
      ) {
        result = new MatchResult(
          1,
          new Point(
            x / query.haystack.pixelDensity.scaleX,
            y / query.haystack.pixelDensity.scaleY
          )
        );
        break;
      }
    }

    if (result) {
      return result;
    } else {
      throw new Error(
        `No match for color RGBA(${color.R},${color.G},${color.B},${color.A}) found`
      );
    }
  }

  async findMatches<PROVIDER_DATA_TYPE>(
    query: MatchRequest<ColorQuery, PROVIDER_DATA_TYPE>
  ): Promise<MatchResult<Point>[]> {
    const jimp = imageToJimp(query.haystack);
    const results: MatchResult<Point>[] = [];
    const color = query.needle.by.color;
    jimp.scan(0, 0, jimp.bitmap.width, jimp.bitmap.height, (x, y, idx) => {
      if (
        jimp.bitmap.data[idx] === color.R &&
        jimp.bitmap.data[idx + 1] === color.G &&
        jimp.bitmap.data[idx + 2] === color.B &&
        jimp.bitmap.data[idx + 3] === color.A
      ) {
        results.push(
          new MatchResult(
            1,
            new Point(
              x / query.haystack.pixelDensity.scaleX,
              y / query.haystack.pixelDensity.scaleY
            )
          )
        );
      }
    });
    return results;
  }
}
