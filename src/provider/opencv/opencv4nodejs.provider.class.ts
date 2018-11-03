import * as cv from "opencv4nodejs";
import {OpenCVProviderInterface} from "./opencv.provider.interface";
import {Image} from "../../image.class";
import {MatchResult} from "../../matchresult.class";
import {Region} from "../../region.class";

export class OpenCV4NodeJSVisionProvider implements OpenCVProviderInterface {
    constructor() {
    }

    async loadImage(imagePath: string): Promise<cv.Mat> {
        return cv.imreadAsync(imagePath);
    }

    async loadImageWithAlphaChannel(imagePath: string): Promise<cv.Mat> {
        const image = await this.loadImage(imagePath);
        if (image.channels < 4) {
            return image.cvtColorAsync(cv.COLOR_BGR2BGRA);
        }
        return Promise.resolve(image);
    }

    async loadImageWithoutAlphaChannel(path: string): Promise<cv.Mat> {
        const image = await this.loadImage(path);
        return Promise.resolve(OpenCV4NodeJSVisionProvider.dropAlphaChannel(image));
    }

    async findMatch(needle: cv.Mat, haystack: cv.Mat): Promise<MatchResult> {
        const result = await haystack.matchTemplateAsync(
            needle,
            cv.TM_SQDIFF_NORMED
        );
        const minMax = await result.minMaxLocAsync();

        const offsetX = needle.cols / 2;
        const offsetY = needle.rows / 2;

        return Promise.resolve(
            new MatchResult(
                1.0 - minMax.minVal,
                new Region(minMax.minLoc.x - offsetX, minMax.minLoc.y - offsetY, needle.cols, needle.rows)
            )
        );
    }

    private static async dropAlphaChannel(img: cv.Mat): Promise<cv.Mat> {
        if (img.channels === 4) {
            return img.cvtColorAsync(cv.COLOR_BGRA2BGR);
        } else {
            return Promise.resolve(img);
        }
    }

    async rgbToGrayScale(img: cv.Mat): Promise<cv.Mat> {
        return img.cvtColorAsync(cv.COLOR_BGR2GRAY);
    }

    async fromImage(img: Image): Promise<cv.Mat> {
        return Promise.resolve(new cv.Mat(img.data, img.height, img.width, cv.CV_8UC4));
    }
}
