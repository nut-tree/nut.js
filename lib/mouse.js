'use strict'

const point = require("./point");

class Mouse {
  constructor(config) {
    this._config = config;
    this._native = require("./proxy/nativeproxy")(config);
  }

  setDelay(min, max) {
    this._native.setMouseDelay(min, max);
  }

  setPosition(target) {
    if (target instanceof point) {
      this._native.setMousePosition(target.x(), target.y());
    } else {
      this._native.setMousePosition(target.x, target.y);
    }
  }

  move(path) {
    for (const node of path) {
      this.setPosition(node);
    }
  }

  leftClick() {
    this._native.leftClick();
  }

  rightClick() {
    this._native.rightClick();
  }
}

function create(config) {
  return new Mouse(config);
}

module.exports = create;
