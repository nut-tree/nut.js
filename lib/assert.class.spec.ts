import { VisionAdapter } from "./adapter/vision.adapter.class";
import { Assert } from "./assert.class";
import { Region } from "./region.class";
import { Screen } from "./screen.class";

jest.mock("./adapter/native.adapter.class");
jest.mock("./adapter/vision.adapter.class");
jest.mock("./screen.class");

describe("Assert", () => {
  it("isVisible should not throw if a match is found.", async () => {
    Screen.prototype.findOnScreen = jest.fn(() => Promise.resolve(new Region(0, 0, 100, 100)));
    const screenMock = new Screen(new VisionAdapter());
    const SUT = new Assert(screenMock);

    await expect(SUT.isVisible("foo")).resolves.not.toThrowError();
  });

  it("isVisible should throw if a match is found.", async () => {
    Screen.prototype.findOnScreen = jest.fn(() => Promise.reject("foo"));
    const screenMock = new Screen(new VisionAdapter());
    const SUT = new Assert(screenMock);

    await expect(SUT.isVisible("foo")).rejects.toThrowError("Element not found");
  });

  it("isVisible should throw if a match is found.", async () => {
    Screen.prototype.findOnScreen = jest.fn(() => Promise.reject("foo"));
    const screenMock = new Screen(new VisionAdapter());
    const SUT = new Assert(screenMock);
    const searchRegion = new Region(10, 10, 10, 10);

    await expect(SUT
      .isVisible("foo", searchRegion))
      .rejects.toThrowError(`Element not found in region ${searchRegion.toString()}`
      );
  });

  it("isNotVisible should throw if a match is found.", async () => {
    Screen.prototype.findOnScreen = jest.fn(() => Promise.resolve(new Region(0, 0, 100, 100)));
    const screenMock = new Screen(new VisionAdapter());
    const SUT = new Assert(screenMock);

    await expect(SUT.notVisible("foo")).rejects.toThrowError("Element visible");
  });

  it("isVisible should throw if a match is found.", async () => {
    Screen.prototype.findOnScreen = jest.fn(() => Promise.reject("foo"));
    const screenMock = new Screen(new VisionAdapter());
    const SUT = new Assert(screenMock);

    await expect(SUT.notVisible("foo")).resolves.not.toThrowError();
  });
});
