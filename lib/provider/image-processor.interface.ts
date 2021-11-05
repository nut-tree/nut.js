import {Image} from "../../dist";
import {Point} from "../point.class";
import {RGBA} from "../rgba.class";

export interface ImageProcessor {
    colorAt(image: Image, location: Point): Promise<RGBA>;
}