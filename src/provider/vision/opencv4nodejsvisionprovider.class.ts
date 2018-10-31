import * as cv from "opencv4nodejs";
import {VisionProviderInterface} from "./visionprovider.interface";

export class OpenCV4NodeJSVisionProvider implements VisionProviderInterface {
    constructor() {
    }

    loadImage(imagePath: string): Promise<cv.Mat> {
        return cv.imreadAsync(imagePath);
    }

    loadImageWithAlphaChannel(imagePath: string): Promise<cv.Mat> {
        return this.loadImage(imagePath).then(loaded => {
            if (loaded.channels < 4) {
                return loaded.cvtColor(cv.COLOR_BGR2BGRA);
            }
            return loaded
        });
    }

    loadImageWithoutAlphaChannel(path: string): Promise<cv.Mat> {
        return this.loadImage(path)
            .then(loaded => this.dropAlphaChannel(loaded));
    }

    findMatch(needle: cv.Mat, haystack: cv.Mat): Promise<{ minVal: number, maxVal: number, minLoc: cv.Point2, maxLoc: cv.Point2 }> {
        const result = haystack.matchTemplate(
            needle,
            cv.TM_SQDIFF_NORMED
        );
        return result.minMaxLocAsync();
    }

    createMatFromImage(img: any): cv.Mat {
        return new cv.Mat(
            img.getData(),
            img.getHeight(),
            img.getWidth(),
            cv.CV_8UC4
        );
    }

    dropAlphaChannel(img: cv.Mat): cv.Mat {
        if (img.channels === 4) {
            return img.cvtColor(cv.COLOR_BGRA2BGR);
        } else {
            return img;
        }
    }

    convertRGBToGrayScale(img: cv.Mat): cv.Mat {
        return img.cvtColor(cv.COLOR_BGR2GRAY);
    }
}
