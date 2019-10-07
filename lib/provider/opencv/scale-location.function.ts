import { Region } from "../../region.class";
import { lowerBound } from "./bound-value.function";

export function scaleLocation(
  result: Region,
  scaleFactor: number,
): Region {
  const boundScaleFactor = lowerBound(scaleFactor, 0.0, 1.0);
  return new Region(
    result.left / boundScaleFactor,
    result.top / boundScaleFactor,
    result.width,
    result.height,
  );
}
