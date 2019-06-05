import { assert, centerOf, down, Key, keyboard, mouse, Region, right, screen, sleep, straightTo } from "./index";

const openXfceMenu = async () => {
  await mouse.move(straightTo(centerOf(screen.find("menu.png"))));
  await mouse.leftClick();
  await mouse.leftClick();
};

const run = async (cmd: string) => {
  await keyboard.type(Key.LeftAlt, Key.F2);
  await keyboard.type(cmd);
  await keyboard.type(Key.Enter);
};

const calculate = async () => {
  await mouse.move(straightTo(centerOf(screen.find("plus.png"))));
  await mouse.leftClick();
  await mouse.move(straightTo(centerOf(screen.find("one.png"))));
  await mouse.leftClick();
  await mouse.move(straightTo(centerOf(screen.find("zero.png"))));
  await mouse.leftClick();
  await mouse.leftClick();
  await keyboard.type(Key.Enter);
};

const close = async () => {
  await mouse.move(straightTo(centerOf(screen.find("close.png"))));
  await mouse.leftClick();
};

describe("E2E screen test", () => {
  it("should throw on invalid images", async () => {
    jest.setTimeout(30000);
    await expect(screen.find("mouse.png")).rejects.toContain("Failed to load image");
  });
});

describe("E2E demo", () => {
  it("should run without throwing", async () => {
    jest.setTimeout(30000);
    screen.config.resourceDirectory = "./e2e/assets";
    await assert.isVisible("mouse.png");
    await assert.isVisible("desktop.png");
    await openXfceMenu();
    await run("gnome-calculator");
    await sleep(1500);
    await assert.isVisible("calculator.png");
    await keyboard.type("525");
    await calculate();
    await assert.isVisible("result.png");
    await close();
  });
});

describe("E2E drag & drop demo", () => {
  it("should run without throwing", async () => {
    jest.setTimeout(60000);
    screen.config.resourceDirectory = "./e2e/assets";
    await assert.isVisible("trash.png");
    await mouse.move(straightTo(centerOf(screen.find("trash.png"))));
    await mouse.drag(down(500));
    await mouse.move(right(100));
    await mouse.leftClick();
    expect(await screen.find("moved_trash.png")).toEqual(new Region(38, 585, 70, 86));
  });
});
