'use strict'

class Area {
  constructor(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  area() {
    return width * height;
  }
}

module.exports = Area;
