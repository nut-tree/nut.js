import * as cv from "opencv4nodejs-prebuilt";
import {Image} from "../../image.class";
import {Region} from "../../region.class";

function determineROI(img: Image, roi: Region): cv.Rect {
    return new cv.Rect(
        Math.min(Math.max(roi.left, 0), img.width),
        Math.min(Math.max(roi.top, 0), img.height),
        Math.min(roi.width, img.width - roi.left),
        Math.min(roi.height, img.height - roi.top));
}

/**
 * fromImageWithAlphaChannel should provide a way to create a library specific
 * image with alpha channel from an abstract Image object holding raw data and image dimension
 *
 * @param {Image} img The input Image
 * @param {Region} [roi] An optional Region to specify a ROI
 * @returns {Promise<any>} An image
 * @memberof VisionProviderInterface
 */
export const fromImageWithAlphaChannel = async (
    img: Image,
    roi?: Region,
): Promise<cv.Mat> => {
    const mat = await new cv.Mat(img.data, img.height, img.width, cv.CV_8UC4).cvtColorAsync(cv.COLOR_BGRA2BGR);
    if (roi) {
        return mat.getRegion(determineROI(img, roi));
    } else {
        return mat;
    }
};

/**
 * fromImageWithoutAlphaChannel should provide a way to create a library specific
 * image without alpha channel from an abstract Image object holding raw data and image dimension
 *
 * @param {Image} img The input Image
 * @param {Region} [roi] An optional Region to specify a ROI
 * @returns {Promise<any>} An image
 * @memberof VisionProviderInterface
 */
export const fromImageWithoutAlphaChannel = async (
    img: Image,
    roi?: Region,
): Promise<cv.Mat> => {
    const mat = new cv.Mat(img.data, img.height, img.width, cv.CV_8UC3);
    if (roi) {
        return mat.getRegion(determineROI(img, roi));
    } else {
        return mat;
    }
};
