import * as cv from "opencv4nodejs";

export interface VisionProviderInterface {
    loadImage(path: string): Promise<cv.Mat>;
    loadImageWithAlphaChannel(path: string): Promise<cv.Mat>;
    loadImageWithoutAlphaChannel(path: string): Promise<cv.Mat>;
    findMatch(needle: cv.Mat, haystack: cv.Mat): Promise<{ minVal: number, maxVal: number, minLoc: cv.Point2, maxLoc: cv.Point2 }>;
    createMatFromImage(img: any): cv.Mat;
    dropAlphaChannel(img: cv.Mat): cv.Mat;
    convertRGBToGrayScale(img: cv.Mat): cv.Mat;
}