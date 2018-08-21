'use strict'

const point = require("../point");

class LineHelper {
  constructor() {
    this._bresenham = require("bresenham");
  }

  straightLine(from, to) {
    if (from instanceof point) {
      if (to instanceof point) {
        return this._bresenham(from.x(), from.y(), to.x(), to.y());
      } else {
        throw new TypeError("'to' is not a point.");
      }
    } else {
      throw new TypeError("'from' is not a point.");
    }
  }
}

function create() {
  return new LineHelper();
}

module.exports = create;
