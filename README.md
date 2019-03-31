# nut.js (Native UI Toolkit) [![Build Status](https://travis-ci.com/nut-tree/nut.js.svg?branch=master)](https://travis-ci.com/nut-tree/nut.js) [![Greenkeeper badge](https://badges.greenkeeper.io/nut-tree/nut.js.svg)](https://greenkeeper.io/) [![SonarCloud badge](https://sonarcloud.io/api/project_badges/measure?project=nut-tree%3Anut.js&metric=alert_status)](https://sonarcloud.io/dashboard?id=nut-tree%3Anut.js) [![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=nut-tree%3Anut.js&metric=coverage)](https://sonarcloud.io/component_measures?id=nut-tree%3Anut.js&metric=coverage)
<p align="center">
Native UI testing / automation with node.js
</p>
<br/>
<p align="center">
	<a target="_blank" href="https://robotjs.io/">
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

const { keyboard, Key, mouse, movement } = require("@nut-tree/nut-js");

const square = async () => {
  await mouse.move(movement.right(500));
  await mouse.move(movement.down(500));
  await mouse.move(movement.left(500));
  await mouse.move(movement.up(500));
};

const openSpotlight = async () => {
  await keyboard.pressKey(Key.LeftSuper);
  await keyboard.pressKey(Key.Space);
  await keyboard.releaseKey(Key.Space);
  await keyboard.releaseKey(Key.LeftSuper);
};

describe("Basic test", () => {
  it("Should run a simple test", async () => {
    await square();
    await openSpotlight();
    await keyboard.type("calculator");
    await keyboard.type(Key.Return);
  });
});

```

# Installation

Running 

```bash
npm i @nut-tree/nut-js
```

or

```bash
yarn add @nut-tree/nut-js
```

will install `nut.js` with its required dependencies.
This will assume that you do not have an existing [OpenCV](https://opencv.org/) installation and will try to build `OpenCV` v3.4.3 from source (via `opencv4nodejs`).
Building `OpenCV` from scratch requires a [cmake](https://cmake.org/) installation.

In case you already have an `OpenCV` installation (version 3.x.x required, e.g. via `brew install opencv@3`), you can disable the build process via environment variable:

```bash
export OPENCV4NODEJS_DISABLE_AUTOBUILD=1
```

or 

```bash
set OPENCV4NODEJS_DISABLE_AUTOBUILD=1
```

Please make sure to also install all required peer dependencies:
 
- [opencv4nodejs](https://github.com/justadudewhohacks/opencv4nodejs#how-to-install)
- [robotjs](http://robotjs.io/docs/building)

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
- [x] waitFor
- [x] Hooks to trigger actions based on images

## Integration

- [x] Jest
