import robot = require("robotjs");
import { Region } from "../../region.class";
import { ScreenAction } from "./robotjs-screen-action.class";

jest.mock("robotjs");

beforeEach(() => {
  jest.resetAllMocks();
});

const screenSize = new Region(0, 0, 100, 100);
const screenShotSize = new Region(0, 0, 200, 200);

describe("robotjs screen action", () => {
  it("should reject when no screenshot data is available", async () => {
    // GIVEN
    const SUT = new ScreenAction();

    // WHEN
    const call = await SUT.grabScreen;

    // THEN
    await expect(call()).rejects.toEqual("Unable to fetch screen content.");
    expect(robot.screen.capture).toBeCalledTimes(1);
  });

  it("should resolve when screenshot data is available", async () => {
    // GIVEN
    const SUT = new ScreenAction();
    robot.screen.capture = jest.fn(() => ({
        height: screenShotSize.height,
        image: new ArrayBuffer(0),
        width: screenShotSize.width,
      })
    );
    robot.getScreenSize = jest.fn(() => ({
        height: screenSize.height,
        width: screenSize.width,
      })
    );

    // WHEN
    const image = await SUT.grabScreen();

    // THEN
    expect(image.width).toEqual(screenShotSize.width);
    expect(image.height).toEqual(screenShotSize.height);
    expect(image.pixelDensity.scaleX).toEqual(2);
    expect(image.pixelDensity.scaleY).toEqual(2);
    expect(robot.screen.capture).toBeCalledTimes(1);
  });

  it("should resolve when screenshot data of a screen region is available", async () => {
    // GIVEN
    const screenRegion = new Region(0, 0, 10, 10);
    const SUT = new ScreenAction();
    robot.screen.capture = jest.fn(() => ({
        height: screenShotSize.height,
        image: new ArrayBuffer(0),
        width: screenShotSize.width,
      })
    );

    // WHEN
    const image = await SUT.grabScreenRegion(screenRegion);

    // THEN
    expect(image.width).toEqual(screenShotSize.width);
    expect(image.height).toEqual(screenShotSize.height);
    expect(image.pixelDensity.scaleX).toEqual(20);
    expect(image.pixelDensity.scaleY).toEqual(20);
    expect(robot.screen.capture).toBeCalledTimes(1);
  });

  it("should reject when no screenshot of a screen region is available", async () => {
    // GIVEN
    const SUT = new ScreenAction();

    // WHEN
    const call = await SUT.grabScreenRegion;
    const screenRegion = new Region(0, 0, 10, 10);

    // THEN
    await expect(call(screenRegion)).rejects.toEqual("Unable to fetch screen content.");
    expect(robot.screen.capture).toBeCalledTimes(1);
    expect(robot.screen.capture)
      .toBeCalledWith(screenRegion.left, screenRegion.top, screenRegion.width, screenRegion.height);
  });

  it("should determine screen width via robotjs", async () => {
    // GIVEN
    const SUT = new ScreenAction();
    robot.getScreenSize = jest.fn(() => ({width: screenSize.width, height: screenSize.height}));

    // WHEN
    const width = await SUT.screenWidth();

    // THEN
    expect(width).toEqual(screenSize.width);
  });

  it("should determine screen height via robotjs", async () => {
    // GIVEN
    const SUT = new ScreenAction();
    robot.getScreenSize = jest.fn(() => ({width: screenSize.width, height: screenSize.height}));

    // WHEN
    const width = await SUT.screenHeight();

    // THEN
    expect(width).toEqual(screenSize.height);
  });

  it("should determine screen size via robotjs", async () => {
    // GIVEN
    const SUT = new ScreenAction();
    robot.getScreenSize = jest.fn(() => ({width: screenSize.width, height: screenSize.height}));

    // WHEN
    const size = await SUT.screenSize();

    // THEN
    expect(size).toEqual(screenSize);
  });
});
