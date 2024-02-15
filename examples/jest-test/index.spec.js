"use strict";

const {jestMatchers, mouse, screen, Point, imageResource, Region, sleep} = require("@nut-tree/nut-js");
require("@nut-tree/nl-matcher");

expect.extend(jestMatchers);

describe("Basic test with custom Jest matchers", () => {
    it("should verify that cursor is at a certain position", async () => {
        // GIVEN
        const targetPoint = new Point(10, 10);
        const targetRegion = new Region(20, 20, 30, 30);

        // WHEN
        await mouse.setPosition(targetPoint);
        await sleep(500);

        // THEN
        await expect(mouse).toBeAt(targetPoint);
        await expect(mouse).not.toBeIn(targetRegion);
    });

    it.skip("should verify that the screen shows a certain image", async () => {
        // Attention:
        // This test has been deactivated intentionally.
        // It is only here to show the usage of the Jest matchers in combination with image search.
        // Feel free to run it by removing the .skip from the it function, but it might fail if there's no image

        // GIVEN
        screen.config.resourceDirectory = "../assets";

        // WHEN

        // THEN
        await expect(screen).toShow(imageResource("mouse.png"), {confidence: 0.8});
    });
});
