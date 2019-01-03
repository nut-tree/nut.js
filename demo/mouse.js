"use strict";

const { Config, Controller, Location } = require("../dist");

const square = async control => {
  await control.mouse.move(control.movement.right(500));
  await control.mouse.move(control.movement.down(500));
  await control.mouse.move(control.movement.left(500));
  await control.mouse.move(control.movement.up(500));
};

(async () => {
  const config = new Config();
  config.matchProbability = 0.99;
  const control = new Controller(config);

  await square(control);
  try {
    const whale = await control.screen.findOnScreen("./assets/docker.png");
    control.mouse.move(control.movement.straightTo(Location.centerOf(whale)));

    const location = await control.screen.findOnScreen("./assets/gitlens.png");
    control.mouse.move(
      control.movement.straightTo(Location.centerOf(location))
    );
    control.mouse.drag(control.movement.right(600));
    control.mouse.move(
      control.movement.straightTo(Location.centerOf(location))
    );
    control.mouse.drag(control.movement.straightTo(Location.centerOf(whale)));
  } catch (error) {
    console.log(error);
  }
})();
