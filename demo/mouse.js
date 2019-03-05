#!/usr/bin/env node

"use strict";

const { mouse, movement, screen, Location } = require("../dist");

const square = async () => {
  await mouse.move(await movement.right(500));
  await mouse.move(await movement.down(500));
  await mouse.move(await movement.left(500));
  await mouse.move(await movement.up(500));
};

(async () => {
  await mouse
    .leftClick();
    await square();
  try {
    screen.config.resourceDirectory = "./assets";
    const whale = await screen.findOnScreen("docker.png");
    await mouse.move(await movement.straightTo(Location.centerOf(whale)));

    const gitlens = await screen.findOnScreen("gitlens.png");
    await mouse.move(await movement.straightTo(Location.centerOf(gitlens)));
    await mouse.drag(await movement.right(600));
    await mouse.move(await movement.straightTo(Location.centerOf(gitlens)));
    await mouse.drag(await movement.straightTo(Location.centerOf(whale)));
  } catch (error) {
    console.log(error);
  }
})();
