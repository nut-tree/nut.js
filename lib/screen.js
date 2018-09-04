'use strict'

const Area = require("./area");
const checks = require("./util/checks");

class Screen {
  constructor(config) {
    this._config = config;
    this._vision = require("./proxy/visionproxy")(config);
    this._native = require("./proxy/nativeproxy")(config);
    this._mouse = require("./mouse")(config);
  }

  grabScreen() {
    return this._vision.createMatFromImage(this._native.grabScreen());
  }

  grabScreenRegion(bounds) {
    return this._vision.createMatFromImage(this._native.grabScreenRegion(bounds));
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
      if (checks.kindOfSimilar(searchRegion, Area)) {
        console.log("Custom search region");
        haystack = this.grabScreenRegion(searchRegion);
      } else if (checks.isNumeric(searchRegion) && searchRegion > 0.0 && searchRegion <= 1.0) {
        console.log("Custom match value");
        minMatch = searchRegion;
        haystack = this.grabScreen();
      }
    } else {
      haystack = this.grabScreen();
    }

    if (match !== undefined && checks.isNumeric(match) && match > 0.0 && match <= 1.0) {
      console.log("Custom match value 2");
      minMatch = match;
    }

    const needle = this._vision.loadImageWithAlphaChannel(pathToNeedle);

    if (haystack) {
      const minMax = this._vision.findMatch(haystack, needle);
      const match = (1.0 - minMax.minVal);
      console.log(minMax, minMatch);
      if (match >= minMatch) {
        return new Area(minMax.minLoc.x, minMax.minLoc.y, needle.cols, needle.rows);
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
