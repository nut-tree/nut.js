'use strict';

let nut = {
    VERSION_MAJOR: 0,
    VERSION_MINOR: 0,
    VERSION_BUGFIX: 1,
    VERSION_STRING: '0.0.1',
    MATCH_PROB: 0.99,
    MOUSE_SPEED: 1000 // Mouse speed in pixel/second
};

nut.Screen = require('./screen')(nut);
nut.Mouse = require('./mouse')(nut);
nut.Movement = require('./movement')(nut);
nut.Location = require('./location')(nut);
nut.Assert = require('./assert')(nut);
nut.Region = require('./region');
nut.Point = require('./point');

module.exports = nut;
