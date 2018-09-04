'use strict'

const nut = require("../lib/nut");

console.log(nut.Screen.location("./docker.png"));
console.log(nut.Screen.width());
console.log(nut.Screen.height());
nut.Mouse.move(nut.Movement.straightTo(nut.Location.centerOf(nut.Screen.location("./file.png"))));
nut.Mouse.leftClick();
nut.Mouse.move(nut.Movement.straightTo(nut.Location.centerOf(nut.Screen.location("./save.png"))));
nut.Mouse.leftClick();
nut.Mouse.move(nut.Movement.down(220));
nut.Mouse.leftClick();

nut.Mouse.move(nut.Movement.straightTo(nut.Location.centerOf(nut.Screen.location("./docker.png"))));

for (let idx = 0; idx < 5; ++idx) {
  nut.Mouse.move(nut.Movement.up(50));
  nut.Mouse.leftClick();
}

console.log(nut.Assert.isVisible("./docker.png"));
console.log(nut.Assert.isVisible("./docker.png", new nut.Area(100, 100, 100, 100)));
console.log(nut.Assert.isVisible("../example_linux/save.png"));
