import {AssertClass} from "./assert.class";
import {Region} from "./region.class";
import {ScreenClass} from "./screen.class";
import providerRegistry from "./provider/provider-registry.class";
import {imageResource} from "../index";

jest.mock('jimp', () => {
});
jest.mock("./screen.class");

describe("Assert", () => {
    it("isVisible should not throw if a match is found.", async () => {
        // GIVEN
        ScreenClass.prototype.find = jest.fn(() => Promise.resolve(new Region(0, 0, 100, 100)));
        const screenMock = new ScreenClass(providerRegistry);
        const SUT = new AssertClass(screenMock);
        const needle = "foo";

        // WHEN

        // THEN
        await expect(SUT.isVisible(imageResource(needle))).resolves.not.toThrowError();
    });

    it("isVisible should throw if a match is found.", async () => {
        // GIVEN
        ScreenClass.prototype.find = jest.fn(() => Promise.reject("foo"));
        const screenMock = new ScreenClass(providerRegistry);
        const SUT = new AssertClass(screenMock);
        const needle = "foo";

        // WHEN

        // THEN
        await expect(SUT.isVisible(imageResource(needle))).rejects.toThrowError(`Element '${needle}' not found`);
    });

    it("isVisible should throw if a match is found.", async () => {
        // GIVEN
        ScreenClass.prototype.find = jest.fn(() => Promise.reject("foo"));
        const screenMock = new ScreenClass(providerRegistry);
        const SUT = new AssertClass(screenMock);
        const searchRegion = new Region(10, 10, 10, 10);
        const needle = "foo";

        // WHEN

        // THEN
        await expect(SUT
            .isVisible(imageResource(needle), searchRegion))
            .rejects.toThrowError(`Element '${needle}' not found in region ${searchRegion.toString()}`
            );
    });

    it("isNotVisible should throw if a match is found.", async () => {
        // GIVEN
        ScreenClass.prototype.find = jest.fn(() => Promise.resolve(new Region(0, 0, 100, 100)));
        const screenMock = new ScreenClass(providerRegistry);
        const SUT = new AssertClass(screenMock);
        const needle = "foo";

        // WHEN

        // THEN
        await expect(SUT.notVisible(imageResource(needle))).rejects.toThrowError(`'${needle}' is visible`);
    });

    it("isVisible should throw if a match is found.", async () => {
        // GIVEN
        ScreenClass.prototype.find = jest.fn(() => Promise.reject("foo"));
        const screenMock = new ScreenClass(providerRegistry);
        const SUT = new AssertClass(screenMock);
        const needle = "foo";

        // WHEN

        // THEN
        await expect(SUT.notVisible(imageResource(needle))).resolves.not.toThrowError();
    });
});
