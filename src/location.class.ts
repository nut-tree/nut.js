import {Point} from "./point.class";
import {Region} from "./region.class";

export class Location {

    public static centerOf(target: Region): Point {
        const x = Math.floor(target.left + target.width / 2);
        const y = Math.floor(target.top + target.height / 2);

        return new Point(x, y);
    }

    public static randomPointIn(target: Region): Point {
        const x = Math.floor(target.left + Math.random() * target.width);
        const y = Math.floor(target.top + Math.random() * target.height);

        return new Point(x, y);
    }
    constructor() {
    }
}
