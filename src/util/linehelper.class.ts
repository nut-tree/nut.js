import {Point} from "../point.class";

import {Bresenham} from "./bresenham.class";

export class LineHelper {
    constructor(readonly bresenham: Bresenham) {
    }

    public straightLine(from: Point, to: Point): Point[] {
        return this.bresenham.compute(from, to);
    }
}
