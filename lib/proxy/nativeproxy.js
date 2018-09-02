'use strict'

const checks = require("../util/checks");


class NativeProxy {
  constructor(config) {
    this._config = config;
    this._robot = require("robot-js");
  }

  grabScreen() {
    if (this._robot.Screen.synchronize()) {
      const _img = this._robot.Image();
      const _main = this._robot.Screen.getMain();
      this._robot.Screen.grabScreen(_img, _main.getBounds());
      return _img;
    }
  }

  getMouse() {
    return this._robot.Mouse();
  }

  setMouseDelay(min, max) {
    const mouse = this.getMouse();
    if (min !== undefined && checks.isNumeric(min)) {
      mouse.autoDelay.min = min;
    }
    if (max !== undefined && checks.isNumeric(max)) {
      mouse.autoDelay.max = max;
    }
  }

  setMousePosition(x, y) {
    this._robot.Mouse.setPos(x, y);
  }

  currentMousePosition() {
    return this._robot.Mouse.getPos();
  }

  screenWidth() {
    return this._robot.Screen().getBounds().w;
  }

  screenHeight() {
    return this._robot.Screen().getBounds().h;
  }

  leftClick() {
    const mouse = this._robot.Mouse();
    mouse.autoDelay;
    mouse.click(this._robot.BUTTON_LEFT);
  }

  rightClick() {
    const mouse = this._robot.Mouse();
    mouse.autoDelay;
    mouse.click(this._robot.BUTTON_RIGHT);
  }
}

function create(options) {
  return new NativeProxy(options);
}

module.exports = create;
