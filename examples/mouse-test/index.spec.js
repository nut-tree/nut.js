"use strict";

const {Button, jestMatchers, mouse, straightTo, centerOf, randomPointIn, Region, Point, right, down, left, up} = require("@nut-tree/nut-js");

expect.extend(jestMatchers);

describe("Mouse test", () => {
    describe("movment", () => {
        it("should demonstrate relative movement", async () => {
            jest.setTimeout(10000);
            await mouse.move(right(500));
            await mouse.move(down(500));
            await mouse.move(left(500));
            await mouse.move(up(500));
        });

        it("should demo straight movement to a Region's center point", async () => {
            // GIVEN
            const targetRegion = new Region(500, 500, 100, 100);

            // WHEN
            await mouse.move(straightTo(centerOf(targetRegion)));

            // THEN
            await expect(mouse).toBeIn(targetRegion);
        });

        it("should demo straight movement to a random Point within a Region", async () => {
            // GIVEN
            const targetRegion = new Region(500, 500, 100, 100);

            // WHEN
            await mouse.move(straightTo(randomPointIn(targetRegion)));

            // THEN
            await expect(mouse).toBeIn(targetRegion);
        });
    });

    describe("scroll", () => {
        it("should demonstrate mouse scroll", async () => {
            await mouse.scrollUp(10);
            await mouse.scrollDown(10);
            await mouse.scrollLeft(5);
            await mouse.scrollRight(5);
        });
    });

    describe("drag", () => {
        it("should perform mouse drag by using 'drag", async () => {
            // GIVEN
            const targetRegion = new Region(500, 500, 100, 100);

            // WHEN
            await mouse.drag(straightTo(randomPointIn(targetRegion)));

            // THEN
            await expect(mouse).toBeIn(targetRegion);
        });

        it("should perform mouse drag by pressing and holding the left mouse button", async () => {
            // GIVEN
            const targetRegion = new Region(500, 500, 100, 100);

            // WHEN
            await mouse.pressButton(Button.LEFT);
            await mouse.move(straightTo(randomPointIn(targetRegion)));
            await mouse.releaseButton(Button.LEFT);

            // THEN
            await expect(mouse).toBeIn(targetRegion);
        });
    });

    describe("EasingFunction", () => {
	    it("should use linear movment by default", async () => {
		    // GIVEN
		    const targetPoint = new Point(10, 10);

		    // WHEN
		    await mouse.move(straightTo(targetPoint));

		    // THEN
		    await expect(mouse).toBeAt(targetPoint);
	    });

	    it("should apply custom easing function written by users", async () => {
		    // GIVEN
		    const targetPoint = new Point(10, 10);

		    /**
		     * An easing function receives a number expressing the percentage our cursor travelled along the path we specified, e.g. via straightTo
		     *
		     * Using this percentage we can reduce or increase cursor speed.
		     * Return values are expected to be positive, finite numbers (otherwise they wont be applied)
		     *
		     * ATTENTION: Be careful with your output range, you could e.g. deadlock your cursor by making it move ultra slow
		     */
		    const customEasingFunction = (x) => {
			    return (x <= 0.5) ? -0.75 : 0.75;
		    };

		    // WHEN
		    await mouse.move(straightTo(targetPoint), customEasingFunction);

		    // THEN
		    await expect(mouse).toBeAt(targetPoint);
	    });
    });
});
