const { _electron: electron } = require("playwright");
const { sleep, getActiveWindow, getWindows } = require("@nut-tree/nut-js");
const { POS_X, POS_Y, WIDTH, HEIGTH, TITLE } = require("./constants");

let app;
let page;
let windowHandle;

const APP_TIMEOUT = 10000;

beforeEach(async () => {
  app = await electron.launch({ args: ["main.js"] });
  page = await app.firstWindow({ timeout: APP_TIMEOUT });
  windowHandle = await app.browserWindow(page);
  await page.waitForLoadState("domcontentloaded");
  await windowHandle.evaluate((win) => {
    win.minimize();
    win.restore();
    win.focus();
  });
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
    const xPosition = 142;
    const yPosition = 425;

    // WHEN
    const foregroundWindow = await getActiveWindow();
    await foregroundWindow.move({ x: xPosition, y: yPosition });
    await sleep(1000);
    const activeWindowRegion = await foregroundWindow.region;

    // THEN
    expect(activeWindowRegion.left).toBe(xPosition);
    expect(activeWindowRegion.top).toBe(yPosition);
  });

  it("should determine correct window size for our application after resizing the window", async () => {
    // GIVEN
    const newWidth = 400;
    const newHeight = 350;

    // WHEN
    const foregroundWindow = await getActiveWindow();
    await foregroundWindow.resize({ width: newWidth, height: newHeight });
    await sleep(1000);
    const activeWindowRegion = await foregroundWindow.region;

    // THEN
    expect(activeWindowRegion.width).toBe(newWidth);
    expect(activeWindowRegion.height).toBe(newHeight);
  });
});

afterEach(async () => {
  if (app) {
    await app.close();
  }
});
