'use strict'

const point = require("./point");
const area = require("./area");

class Mouse {
  constructor(config) {
    this._config = config;
    this._native = require("./proxy/nativeproxy")(config);
  }

  setMinDelay(delay) {
    const mouse = this._robot.Mouse();
    mouse.autoDelay.min = delay;
  }

  setMaxDelay(delay) {
    const mouse = this._robot.Mouse();
    mouse.autoDelay.max = delay;
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
