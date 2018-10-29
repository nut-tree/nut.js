'use strict';

const _ = require('lodash');

const checks = require('../util/checks');
const Region = require('../region');

class NativeProxy {
    constructor(config) {
        this._config = config;
        this._robot = require('robot-js');
    }

    grabScreen() {
        if (this._robot.Screen.synchronize()) {
            const _img = this._robot.Image();
            const _main = this._robot.Screen.getMain();
            this._robot.Screen.grabScreen(_img, _main.getBounds());
            return _img;
        }
    }

    grabScreenRegion(region) {
        if (this._robot.Screen.synchronize()) {
            let bounds = undefined;
            if (region instanceof Region || checks.kindOfSimilar(region, Region)) {
                bounds = this._robot.Bounds(
                    region.left,
                    region.top,
                    region.width,
                    region.height
                );
            } else if (region instanceof this._robot.Bounds) {
                bounds = region;
            }
            if (bounds !== undefined) {
                const _img = this._robot.Image();
                this._robot.Screen.grabScreen(_img, bounds);
                return _img;
            }
            console.log('Unable to set search region.');
            return this.grabScreen();
        }
    }

    getMouse() {
        return this._robot.Mouse();
    }

    setMouseDelay(min, max) {
        const mouse = this.getMouse();
        if (min !== undefined && _.isFinite(min)) {
            mouse.autoDelay.min = min;
        }
        if (max !== undefined && _.isFinite(max)) {
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
        return this._robot.Screen.getMain().getBounds().w;
    }

    screenHeight() {
        return this._robot.Screen.getMain().getBounds().h;
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
