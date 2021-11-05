import Jimp from 'jimp';
import {Image} from "../../image.class";
import {Point} from "../../point.class";
import {ImageProcessor} from "../image-processor.interface";
import {imageToJimp} from "../io/imageToJimp.function";
import {RGBA} from "../../rgba.class";

export default class implements ImageProcessor {
    colorAt(image: Image, location: Point): Promise<RGBA> {
        return new Promise<RGBA>((resolve, reject) => {
            if (location.x < 0 || location.x >= image.width) {
                reject(`Query location out of bounds. Should be in range 0 <= x < image.width, is ${location.x}`);
            }
            if (location.y < 0 || location.y >= image.height) {
                reject(`Query location out of bounds. Should be in range 0 <= y < image.height, is ${location.y}`);
            }
            const jimpImage = imageToJimp(image);
            const rgba = Jimp.intToRGBA(jimpImage.getPixelColor(location.x, location.y));
            resolve(new RGBA(rgba.r, rgba.g, rgba.b, rgba.a));
        });
    }
}
