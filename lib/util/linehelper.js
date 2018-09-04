'use strict'

const Point = require("../point");
const checks = require("../util/checks");

class LineHelper {
  constructor() {
    this._bresenham = require("bresenham");
  }

  straightLine(from, to) {
    if (from instanceof Point || checks.kindOfSimilar(from, Point)) {
      if (to instanceof Point || checks.kindOfSimilar(to, Point)) {
        return this._bresenham(from.x, from.y, to.x, to.y);
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
