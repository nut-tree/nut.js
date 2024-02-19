import { AssertClass } from "./assert.class";
import { Region } from "@nut-tree/shared";
import { ScreenClass } from "./screen.class";
import providerRegistry from "./provider/provider-registry.class";
import { Image } from "../index";
import { mockPartial } from "sneer";

jest.mock("./screen.class");

const needleId = "needleId";

describe("Assert", () => {
  it("isVisible should not throw if a match is found.", async () => {
    // GIVEN
    ScreenClass.prototype.find = jest.fn(() =>
      Promise.resolve(new Region(0, 0, 100, 100))
    ) as any;
    const screenMock = new ScreenClass(providerRegistry);
    const SUT = new AssertClass(screenMock);
    const needle = mockPartial<Image>({
      id: needleId
    });

    // WHEN

    // THEN
    await expect(SUT.isVisible(needle)).resolves.not.toThrowError();
  });

  it("isVisible should throw if a match is found.", async () => {
    // GIVEN
    ScreenClass.prototype.find = jest.fn(() => Promise.reject("foo")) as any;
    const screenMock = new ScreenClass(providerRegistry);
    const SUT = new AssertClass(screenMock);
    const needle = mockPartial<Image>({
      id: needleId
    });

    // WHEN

    // THEN
    await expect(SUT.isVisible(needle)).rejects.toThrowError(
      `Element '${needle.id}' not found`
    );
  });

  it("isVisible should throw if a match is found.", async () => {
    // GIVEN
    ScreenClass.prototype.find = jest.fn(() => Promise.reject("foo")) as any;
    const screenMock = new ScreenClass(providerRegistry);
    const SUT = new AssertClass(screenMock);
    const searchRegion = new Region(10, 10, 10, 10);
    const needle = mockPartial<Image>({
      id: needleId
    });

    // WHEN

    // THEN
    await expect(SUT.isVisible(needle, searchRegion)).rejects.toThrowError(
      `Element '${needle.id}' not found in region ${searchRegion.toString()}`
    );
  });

  it("isNotVisible should throw if a match is found.", async () => {
    // GIVEN
    ScreenClass.prototype.find = jest.fn(() =>
      Promise.resolve(new Region(0, 0, 100, 100))
    ) as any;
    const screenMock = new ScreenClass(providerRegistry);
    const SUT = new AssertClass(screenMock);
    const needle = mockPartial<Image>({
      id: needleId
    });

    // WHEN

    // THEN
    await expect(SUT.notVisible(needle)).rejects.toThrowError(
      `'${needle.id}' is visible`
    );
  });

  it("isVisible should throw if a match is found.", async () => {
    // GIVEN
    ScreenClass.prototype.find = jest.fn(() => Promise.reject("foo")) as any;
    const screenMock = new ScreenClass(providerRegistry);
    const SUT = new AssertClass(screenMock);
    const needle = mockPartial<Image>({
      id: needleId
    });

    // WHEN

    // THEN
    await expect(SUT.notVisible(needle)).resolves.not.toThrowError();
  });
});
