'use strict'

class Point {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  x() {
    return this._x;
  }

  y() {
    return this._y;
  }
}

module.exports = Point;
