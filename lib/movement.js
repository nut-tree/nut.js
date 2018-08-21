'use strict'

const point = require("./point");

class Movement {
  constructor(config) {
    this._config = config;
    this._native = require("./proxy/nativeproxy")(config);
    this._lineutil = require("./util/linehelper")();
  }

  getPosition() {
    const pos = this._native.currentMousePosition();
    return new point(pos.x, pos.y);
  }

  straightTo(target) {
    if (target instanceof point) {
      const origin = this.getPosition();
      return this._lineutil.straightLine(origin, target);
    } else {
      throw new TypeError("Not a point.");
    }
  }

  down(px) {
    const pos = this.getPosition();
    return this.straightTo(new point(pos.x(), pos.y() + px));
  }

  up(px) {
    const pos = this.getPosition();
    return this.straightTo(new point(pos.x(), pos.y() - px));
  }

  left(px) {
    const pos = this.getPosition();
    return this.straightTo(new point(pos.x() - px, pos.y()));
  }

  right(px) {
    const pos = this.getPosition();
    return this.straightTo(new point(pos.x() + px, pos.y()));
  }
}

function create(config) {
  return new Movement(config);
}

module.exports = create;
