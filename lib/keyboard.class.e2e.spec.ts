import { jestMatchers, Key, keyboard, screen } from "../index";

jest.setTimeout(30000);
expect.extend(jestMatchers);

const run = async (cmd: string) => {
  await keyboard.type(Key.LeftAlt, Key.F2);
  await keyboard.type(cmd);
  await keyboard.type(Key.Enter);
};

const confirm = async () => {
  await keyboard.type(Key.Enter);
};

const close = async () => {
  await keyboard.type(Key.LeftAlt, Key.F4);
};

describe("Keyboard e2e class", () => {
  it("should open gnome calculator via keyboard.", async () => {
    // GIVEN
    screen.config.resourceDirectory = "./e2e/assets";
    screen.config.confidence = 0.97;
    await run("gnome-calculator");
    await confirm();

    // WHEN

    // THEN
    await expect(screen).toShow("calculator.png");
    await close();
  });
});
