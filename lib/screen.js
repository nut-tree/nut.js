'use strict';

const _ = require('lodash');

const Region = require('./region');
const checks = require('./util/checks');

class Screen {
    constructor(config) {
        this._config = config;
        this._vision = require('./proxy/visionproxy')(config);
        this._native = require('./proxy/nativeproxy')(config);
        this._mouse = require('./mouse')(config);
    }

    grabScreen() {
        return this._vision.dropAlphaChannel(this._vision.createMatFromImage(this._native.grabScreen()));
    }

    grabScreenRegion(bounds) {
        return this._vision.dropAlphaChannel(this._vision.createMatFromImage(this._native.grabScreenRegion(bounds)));
    }

    width() {
        return this._native.screenWidth();
    }

    height() {
        return this._native.screenHeight();
    }

    location(pathToNeedle, searchRegion, match) {
        let minMatch = this._config.MATCH_PROB;
        let haystack = undefined;
        if (searchRegion !== undefined) {
            if (checks.kindOfSimilar(searchRegion, Region)) {
                haystack = this.grabScreenRegion(searchRegion);
            } else if (_.isFinite(searchRegion) && searchRegion > 0.0 && searchRegion <= 1.0) {
                minMatch = searchRegion;
                haystack = this.grabScreen();
            }
        } else {
            haystack = this.grabScreen();
        }

        if (match !== undefined && _.isFinite(match) && match > 0.0 && match <= 1.0) {
            minMatch = match;
        }

        let needle = this._vision.loadImage(pathToNeedle);

        if (minMatch < 1.0) {
            needle = this._vision.convertRGBToGrayScale(needle);
            haystack = this._vision.convertRGBToGrayScale(haystack);
        }

        if (haystack) {
            const minMax = this._vision.findMatch(haystack, needle);
            const match = (1.0 - minMax.minVal);
            console.log(minMax, minMatch);
            if (match >= minMatch) {
                return new Region(minMax.minLoc.x, minMax.minLoc.y, needle.cols, needle.rows);
            } else {
                throw new Error(`No matching pattern for ${pathToNeedle} found. Required match: ${minMatch}, given: ${match}`);
            }
        }
    }
}

function create(config) {
    return new Screen(config);
}

module.exports = create;
