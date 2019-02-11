# nut.js (Native UI Toolkit) [![Build Status](https://travis-ci.com/nut-tree/nut.js.svg?branch=master)](https://travis-ci.com/nut-tree/nut.js) [![Greenkeeper badge](https://badges.greenkeeper.io/nut-tree/nut.js.svg)](https://greenkeeper.io/) ![SonarCloud badge](https://sonarcloud.io/api/project_badges/measure?project=nut-tree%3Anut.js&metric=alert_status)
<p align="center">
Native UI testing / controlling with node.js
</p>
<br/>
<p align="center">
	<a target="_blank" href="http://getrobot.net">
		<img src="https://img.shields.io/badge/Built_with-ROBOT-C86414.svg?style=flat-square" alt="Built with Robot" />
	</a>
	<a target="_blank" href="https://github.com/justadudewhohacks/opencv4nodejs">
		<img src="https://img.shields.io/badge/Built_with-opencv4nodejs-C86414.svg?style=flat-square" alt="Built with opencv4nodejs" />
</p>

# About

<p align="center">
    <img src=".gfx/nut.png" alt="logo" width="200"/>
</p>

This is a WIP implementation for a cross-platform native UI testing tool.
It allows for native UI interactions via keyboard and / or mouse,
but additionally gives you the possibility to navigate the screen based on image matching.

# Sample

The following snippet shows a valid NUT example (on macOS)

```js
"use strict";

const native = require("@nut-tree/nut-js");

const square = async (control) => {
    await control.mouse.move(control.movement.right(500));
    await control.mouse.move(control.movement.down(500));
    await control.mouse.move(control.movement.left(500));
    await control.mouse.move(control.movement.up(500));
};

const openSpotlight = async (control) => {
    await control.keyboard.pressKey(native.Key.LeftSuper);
    await control.keyboard.pressKey(native.Key.Space);
    await control.keyboard.releaseKey(native.Key.Space);
    await control.keyboard.releaseKey(native.Key.LeftSuper);
};

describe("Basic test", () => {
    it("Should run a simple test", async () => {
        const config = new native.Config();
        const control = new native.Controller(config);

        await square(control);
        await openSpotlight(control);
        await control.keyboard.type("calculator");
        await control.keyboard.type(native.Key.Return);
    });
});

```

# Examples

[nut-tree/trailmix](https://github.com/nut-tree/trailmix) contains a set of ready to use examples which demo the usage ot nut.js.

# Modules

This list gives an overview on currently implemented and planned functionality.
It's work in progress and will undergo constant modification.

## Clipboard

- [x] Copy text to clipboard
- [x] Paste text from clipboard

## Keyboard

- [x] Support for standard US keyboard layout
- [x] Support for German special characters

## Mouse

- [x] Support for mouse movement
- [x] Support for mouse scroll
- [x] Configurable movement speed
- [x] Mouse drag

## Process

- [ ] Retrieve the region of a process window

## Screen

- [x] findOnScreen
- [ ] waitFor
- [ ] Hooks to trigger actions based on images

## Integration

- [x] Jest
