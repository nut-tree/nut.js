'use strict'

class Area {
  constructor(left, top, width, height) {
    this._left = left;
    this._top = top;
    this._width = width;
    this._height = height;
  }

  left() {
    return this._left;
  }

  top() {
    return this._top;
  }

  width() {
    return this._width;
  }

  height() {
    return this._height;
  }

  area() {
    return width * height;
  }
}

module.exports = Area;
