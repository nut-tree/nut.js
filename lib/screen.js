'use strict'

const Area = require("./area");

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

  location(pathToNeedle, searchRegion) {
    let haystack = undefined;
    if (searchRegion !== undefined) {
      haystack = this.grabScreenRegion(searchRegion);
    } else {
      haystack = this.grabScreen();
    }
    const needle = this._vision.loadImageWithAlphaChannel(pathToNeedle);
    if (haystack) {
      const minMax = this._vision.findMatch(haystack, needle);
      if ((1.0 - minMax.minVal) > this._config.MATCH_PROB) {
        return new Area(minMax.minLoc.x, minMax.minLoc.y, needle.cols, needle.rows);
      }
    }
  }
}

function create(config) {
  return new Screen(config);
}

module.exports = create;
