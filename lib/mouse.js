"use strict";

class Mouse {
  constructor(config) {
    this._config = config;
    this._native = require("./proxy/nativeproxy")(config);
    this._movement = require("./movement");
  }

  setDelay(min, max) {
    this._native.setMouseDelay(min, max);
  }

  setPosition(target) {
    this._native.setMousePosition(target.x, target.y);
  }

  move(path, type) {
    const speed = this._config.MOUSE_SPEED;
    let timeSteps = [];
    for (const node of path) {
      timeSteps.push(Math.floor((1 / speed) * 1000));
    }
    for (let idx = 0; idx < path.length; ++idx) {
      const node = path[idx];
      const minTime = timeSteps[idx];
      let previous = Date.now();
      let current = Date.now();
      while (current - previous < minTime) {
        current = Date.now();
      }
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
