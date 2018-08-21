'use strict'

const nut = require("../lib/nut");

console.log(nut.Screen.location("./docker.png"));
nut.Mouse.move(nut.Movement.straightTo(nut.Location.centerOf(nut.Screen.location("./file.png"))));
nut.Mouse.leftClick();
nut.Mouse.move(nut.Movement.straightTo(nut.Location.centerOf(nut.Screen.location("./save.png"))));
nut.Mouse.leftClick();
nut.Mouse.move(nut.Movement.down(220));
nut.Mouse.leftClick();

nut.Mouse.move(nut.Movement.straightTo(nut.Location.randomPointAt(nut.Screen.location("./docker.png"))));

for (let idx = 0; idx < 5; ++idx) {
  nut.Mouse.move(nut.Movement.up(50));
  nut.Mouse.leftClick();
}
