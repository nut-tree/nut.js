'use strict'

const nut = require("../lib/nut");

nut.MATCH_PROB = 0.93;

console.log(nut.Screen.location("./docker.png"));
console.log(nut.Screen.width());
console.log(nut.Screen.height());
nut.Mouse.move(nut.Movement.straightTo(nut.Location.centerOf(nut.Screen.location("./file.png"))));
nut.Mouse.leftClick();
nut.Mouse.move(nut.Movement.straightTo(nut.Location.centerOf(nut.Screen.location("./save.png"))));
nut.Mouse.leftClick();
nut.Mouse.move(nut.Movement.straightTo(nut.Location.centerOf(nut.Screen.location("./save_button.png"))));
nut.Mouse.leftClick();

nut.Mouse.move(nut.Movement.straightTo(nut.Location.randomPointAt(nut.Screen.location("./docker.png"))));

for (let idx = 0; idx < 5; ++idx) {
  nut.Mouse.move(nut.Movement.up(50));
  nut.Mouse.leftClick();
}

try {
  nut.Assert.isVisible("./docker.png", new nut.Area(100, 100, 100, 100));
} catch (err) {
  console.log(err.message);
}
