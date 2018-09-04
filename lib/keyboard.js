'use strict'

class Keyboard {
  constructor(config) {
    this._config = config;
    this._native = require("./proxy/nativeproxy")(config);
  }
}

function create(config) {
  return new Keyboard(config);
}

module.exports = create;
