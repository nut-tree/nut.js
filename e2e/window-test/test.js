const Application = require("spectron").Application;
const electronPath = require("electron");
const { getActiveWindow, getWindows } = require("@nut-tree/nut-js");
const { POS_X, POS_Y, WIDTH, HEIGTH, TITLE } = require("./constants");
const { join } = require("path");

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let app;
const APP_TIMEOUT = 10000;
jest.setTimeout(3 * APP_TIMEOUT);

beforeEach(async () => {
  app = new Application({
    path: electronPath,
    args: [join(__dirname, "main.js")],
    startTimeout: APP_TIMEOUT,
    waitTimeout: APP_TIMEOUT,
  });
  await app.start();
  await app.client.waitUntilWindowLoaded();
  await app.browserWindow.minimize();
  await app.browserWindow.restore();
  await app.browserWindow.focus();
});

describe("getWindows", () => {
  it("should list our started application window", async () => {
    // GIVEN
    const openWindows = await getWindows();

    // WHEN
    const windowNames = await Promise.all(openWindows.map((wnd) => wnd.title));

    // THEN
    expect(windowNames).toContain(TITLE);
  });
});

describe("getActiveWindow", () => {
  it("should return our started application window", async () => {
    // GIVEN

    // WHEN
    const foregroundWindow = await getActiveWindow();
    const windowTitle = await foregroundWindow.title;

    // THEN
    expect(windowTitle).toBe(TITLE);
  });

  it("should determine correct coordinates for our application", async () => {
    // GIVEN

    // WHEN
    const foregroundWindow = await getActiveWindow();
    const activeWindowRegion = await foregroundWindow.region;

    // THEN
    expect(activeWindowRegion.left).toBe(POS_X);
    expect(activeWindowRegion.top).toBe(POS_Y);
    expect(activeWindowRegion.width).toBe(WIDTH);
    expect(activeWindowRegion.height).toBe(HEIGTH);
  });

  it("should determine correct coordinates for our application after moving the window", async () => {
    // GIVEN
    const xPosition = 42;
    const yPosition = 25;
    await app.browserWindow.setPosition(xPosition, yPosition);
    await sleep(1000);

    // WHEN
    const foregroundWindow = await getActiveWindow();
    const activeWindowRegion = await foregroundWindow.region;

    // THEN
    expect(activeWindowRegion.left).toBe(xPosition);
    expect(activeWindowRegion.top).toBe(yPosition);
  });

  it("should determine correct window size for our application after resizing the window", async () => {
    // GIVEN
    const newWidth = 400;
    const newHeight = 350;
    await app.browserWindow.setSize(newWidth, newHeight);
    await sleep(1000);

    // WHEN
    const foregroundWindow = await getActiveWindow();
    const activeWindowRegion = await foregroundWindow.region;

    // THEN
    expect(activeWindowRegion.width).toBe(newWidth);
    expect(activeWindowRegion.height).toBe(newHeight);
  });
});

afterEach(async () => {
  if (app && app.isRunning()) {
    await app.stop();
  }
});
