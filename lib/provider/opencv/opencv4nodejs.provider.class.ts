import * as cv from "opencv4nodejs";
import {Image} from "../../image.class";
import {MatchResult} from "../../matchresult.class";
import {Region} from "../../region.class";
import {IOpenCVProviderInterface} from "./IOpenCVProviderInterface";

export class OpenCV4NodeJSVisionProvider implements IOpenCVProviderInterface {

    private static async dropAlphaChannel(img: cv.Mat): Promise<cv.Mat> {
        if (img.channels === 4) {
            return img.cvtColorAsync(cv.COLOR_BGRA2BGR);
        } else {
            return Promise.resolve(img);
        }
    }
    constructor() {
    }

    public async loadImage(imagePath: string): Promise<cv.Mat> {
        return cv.imreadAsync(imagePath);
    }

    public async loadImageWithAlphaChannel(imagePath: string): Promise<cv.Mat> {
        const image = await this.loadImage(imagePath);
        if (image.channels < 4) {
            return image.cvtColorAsync(cv.COLOR_BGR2BGRA);
        }
        return Promise.resolve(image);
    }

    public async loadImageWithoutAlphaChannel(path: string): Promise<cv.Mat> {
        const image = await this.loadImage(path);
        return Promise.resolve(OpenCV4NodeJSVisionProvider.dropAlphaChannel(image));
    }

    public async findMatch(needle: cv.Mat, haystack: cv.Mat): Promise<MatchResult> {
        const result = await haystack.matchTemplateAsync(
            needle,
            cv.TM_SQDIFF_NORMED,
        );
        const minMax = await result.minMaxLocAsync();

        const offsetX = needle.cols / 2;
        const offsetY = needle.rows / 2;

        return Promise.resolve(
            new MatchResult(
                1.0 - minMax.minVal,
                new Region(minMax.minLoc.x - offsetX, minMax.minLoc.y - offsetY, needle.cols, needle.rows),
            ),
        );
    }

    public async rgbToGrayScale(img: cv.Mat): Promise<cv.Mat> {
        return img.cvtColorAsync(cv.COLOR_BGR2GRAY);
    }

    public async fromImageWithAlphaChannel(img: Image, roi?: Region): Promise<cv.Mat> {
        const mat = new cv.Mat(img.data, img.height, img.width, cv.CV_8UC4);
        if (roi) {
            return Promise.resolve(mat.getRegion(new cv.Rect(roi.left, roi.top, roi.width, roi.height)));
        } else {
            return Promise.resolve(mat);
        }
    }

    public async fromImageWithoutAlphaChannel(img: Image, roi?: Region): Promise<cv.Mat> {
        const newMat = await this.fromImageWithAlphaChannel(img, roi);
        if (newMat.channels > 3) {
            return newMat.cvtColorAsync(cv.COLOR_BGRA2BGR);
        }
        return Promise.resolve(newMat);
    }
}
