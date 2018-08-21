'use strict'

const area = require("./area");

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

  width() {
    return this._native.screenWidth();
  }

  height() {
    return this._native.screenHeight();
  }

  location(pathToNeedle) {
    const haystack = this.grabScreen();
    const needle = this._vision.loadImageWithAlphaChannel(pathToNeedle);
    if (haystack) {
      const minMax = this._vision.findMatch(haystack, needle);
      return new area(minMax.maxLoc.x, minMax.maxLoc.y, needle.cols, needle.rows);
    }
  }
}

function create(config) {
  return new Screen(config);
}

module.exports = create;
