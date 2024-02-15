"use strict";

const {keyboard, Key} = require("@nut-tree/nut-js");

describe("Keyboard test", () => {
    it("should open Spotlight on macOS", async () => {
        await keyboard.type(Key.LeftSuper, Key.Space);
        await keyboard.type("calculator");
        await keyboard.pressKey(Key.Return);
        await keyboard.releaseKey(Key.Return);
    });
});
