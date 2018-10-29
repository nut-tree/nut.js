'use strict';

class VisionProxy {
    constructor(config) {
        this.config = config;
        this._cv = require('opencv4nodejs');
    }

    createMatFromImage(img) {
        return new this._cv.Mat(
            img.getData(),
            img.getHeight(),
            img.getWidth(),
            this._cv.CV_8UC4
        );
    }

    loadImage(imagePath) {
        return this._cv.imread(imagePath);
    }

    loadImageWithAlphaChannel(imagePath) {
        const mat = this.loadImage(imagePath);
        if (mat.channels < 4) {
            return mat.cvtColor(this._cv.COLOR_BGR2BGRA);
        }
        return mat;
    }

    dropAlphaChannel(img) {
        if (img.channels === 4) {
            return img.cvtColor(this._cv.COLOR_BGRA2BGR);
        } else {
            return img;
        }
    }

    convertRGBToGrayScale(img) {
        return img.cvtColor(this._cv.COLOR_BGR2GRAY);
    }

    findMatch(haystack, needle) {
        const result = haystack.matchTemplate(
            needle,
            this._cv.TM_SQDIFF_NORMED
        );
        return result.minMaxLoc();
    }
}

function create(config) {
    return new VisionProxy(config);
}

module.exports = create;
