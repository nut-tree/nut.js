'use strict'

let nut = {
  VERSION_MAJOR: 0,
  VERSION_MINOR: 0,
  VERSION_BUGFIX: 1,
  VERSION_STRING: "0.0.1"
};

nut.Screen = require("./screen")(nut);
nut.Mouse = require("./mouse")(nut);
nut.Movement = require("./movement")(nut);
nut.Location = require("./location")(nut);

module.exports = nut;
