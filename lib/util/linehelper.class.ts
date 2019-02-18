import { Point } from "../point.class";

import { Bresenham } from "./bresenham.class";

export class LineHelper {
  constructor() {}

  public straightLine(from: Point, to: Point): Point[] {
    return Bresenham.compute(from, to);
  }
}
