'use strict'

class Assert {
  constructor(config) {
    this._config = config;
    this._screen = require("./screen")(config);
  }

  isVisible(pathToNeedle, searchRegion) {
    const area = this._screen.location(pathToNeedle, searchRegion);
    if (area === undefined && searchRegion !== undefined) {
      throw new Error(`Element not found in region ${searchRegion.toString()}`);
    } else if (area === undefined) {
      throw new Error("Element not found.");
    }
  }
}

function create(config) {
  return new Assert(config);
}

module.exports = create;
