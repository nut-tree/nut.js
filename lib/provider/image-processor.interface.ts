import {Point} from "../point.class";
import {RGBA} from "../rgba.class";
import {Image} from "../image.class";

export interface ImageProcessor {
    colorAt(image: Image, location: Point): Promise<RGBA>;
}