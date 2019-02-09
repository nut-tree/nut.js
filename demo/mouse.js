#!/usr/bin/env node

"use strict";

const { mouse, movement, screen, Location } = require("../dist");

const square = async () => {
  await mouse.move(movement.right(500));
  await mouse.move(movement.down(500));
  await mouse.move(movement.left(500));
  await mouse.move(movement.up(500));
};

(async () => {
  mouse
    .leftClick()
  // await square();
  try {
    screen.config.resourceDirectory = "./assets";
    const whale = await screen.findOnScreen("docker.png");
    mouse.move(movement.straightTo(Location.centerOf(whale)));

    const gitlens = await screen.findOnScreen("gitlens.png");
    mouse.move(movement.straightTo(Location.centerOf(gitlens)));
    mouse.drag(movement.right(600));
    mouse.move(movement.straightTo(Location.centerOf(gitlens)));
    mouse.drag(movement.straightTo(Location.centerOf(whale)));
  } catch (error) {
    console.log(error);
  }
})();
