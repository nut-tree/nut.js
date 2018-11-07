# NUT (Native UI Toolkit) [![Build Status](https://travis-ci.org/s1hofmann/native-ui-toolkit.svg?branch=master)](https://travis-ci.org/s1hofmann/native-ui-toolkit)
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

This is a WIP implementation for a cross-platform native UI testing tool.
It allows for native UI interactions via keyboard and / or mouse,
but additionally gives you the possibility to navigate the screen based on image matching.

# Modules

## Assertions

- [x] isVisible
- [x] isNotVisible

## Clipboard

- [ ] Copy to clipboard
- [ ] Paste from clipboard

## Keyboard

- [x] Support for standard US keyboard layout
- [ ] Support for German keyboard layout

## Mouse

- [x] Support for basic mouse movement
- [x] Configurable movement speed

## Process

- [ ] Spawn new process
- [ ] Retrieve region of process window
- [ ] Close spawned process

## Screen

- [x] Support to search for images on screen