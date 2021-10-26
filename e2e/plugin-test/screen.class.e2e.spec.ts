import {existsSync} from "fs";
import {screen, sleep, FileType, Region} from "@nut-tree/nut-js";
import AbortController from "node-abort-controller";

import "@nut-tree/template-matcher";

jest.setTimeout(10000);

describe("Screen.", () => {
    it("should capture the screen", () => {
        // GIVEN

        // WHEN
        screen.capture("asdf", FileType.PNG).then(filename => {
            // THEN
            expect(filename).not.toBeNull();
            sleep(1000).then(() => {
                expect(existsSync(filename)).toBeTruthy();
            });
        });
    });

    it("should capture the screen and save to JPG", () => {
        // GIVEN

        // WHEN
        screen.capture("asdf", FileType.JPG).then(filename => {
            // THEN
            expect(filename).not.toBeNull();
            sleep(1000).then(() => {
                expect(existsSync(filename)).toBeTruthy();
            });
        });
    });

    it("should capture the screen and save file with prefix", () => {
        // GIVEN
        const prefix = "foo_";

        // WHEN
        screen.capture("asdf", FileType.JPG, "./", prefix).then(filename => {
            // THEN
            expect(filename.includes(prefix)).toBeTruthy();
            expect(filename).not.toBeNull();
            sleep(1000).then(() => {
                expect(existsSync(filename)).toBeTruthy();
            });
        });
    });

    it("should capture the screen and save file with postfix", () => {
        // GIVEN
        const postfix = "_bar";

        // WHEN
        screen.capture("asdf", FileType.JPG, "./", "", postfix).then(filename => {
            // THEN
            expect(filename.includes(postfix)).toBeTruthy();
            expect(filename).not.toBeNull();
            sleep(1000).then(() => {
                expect(existsSync(filename)).toBeTruthy();
            });
        });
    });

    it("should capture the screen and save file with pre- and postfix", () => {
        // GIVEN
        const filename = "asdf";
        const prefix = "foo_";
        const postfix = "_bar";

        // WHEN
        screen.capture("asdf", FileType.JPG, "./", prefix, postfix).then(output => {
            // THEN
            expect(output.includes(`${prefix}${filename}${postfix}`)).toBeTruthy();
            expect(output).not.toBeNull();
            sleep(1000).then(() => {
                expect(existsSync(output)).toBeTruthy();
            });
        });
    });

    it("should reject after timeout", async () => {
        // GIVEN
        const timeout = 5000;
        screen.config.resourceDirectory = "./e2e/assets";

        // WHEN
        const start = Date.now();
        try {
            await screen.waitFor("calculator.png", timeout);
        } catch (e) {
            // THEN
            expect(e).toBe(`Action timed out after ${timeout} ms`);
        }
        const end = Date.now();

        // THEN
        expect(end - start).toBeGreaterThanOrEqual(timeout);
    });

    it("should abort via signal", (done) => {
        // GIVEN
        const timeout = 5000;
        const abortAfterMs = 1000;
        const controller = new AbortController();
        const signal = controller.signal;
        screen.config.resourceDirectory = "./e2e/assets";

        // WHEN
        const start = Date.now();
        screen.waitFor("calculator.png", timeout, {abort: signal}).catch(e => {
            const end = Date.now();

            // THEN
            expect(e).toBe(`Action aborted by signal`);
            expect(end - start).toBeGreaterThanOrEqual(abortAfterMs);
            expect(end - start).toBeLessThan(timeout);
            done();
        });
        setTimeout(() => controller.abort(), abortAfterMs);
    });

    it("should grab the whole screen content and return an Image", async () => {
        // GIVEN
        const screenWidth = await screen.width();
        const screenHeight = await screen.height();

        // WHEN
        const image = await screen.grab();

        // THEN
        expect(image.data).not.toBeUndefined();
        expect(image.width / image.pixelDensity.scaleX).toBe(screenWidth);
        expect(image.height / image.pixelDensity.scaleY).toBe(screenHeight);
    });

    it("should grab a screen region and return an Image", async () => {
        // GIVEN
        const regionToGrab = new Region(0, 0, 100, 100);

        // WHEN
        const image = await screen.grabRegion(regionToGrab);

        // THEN
        expect(image.data).not.toBeUndefined();
        expect(image.width / image.pixelDensity.scaleX).toBe(regionToGrab.width);
        expect(image.height / image.pixelDensity.scaleY).toBe(regionToGrab.height);
    });
});
