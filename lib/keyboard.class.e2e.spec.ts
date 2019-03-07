import { jestMatchers, Key, keyboard, screen } from "../index";

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
  it("should paste copied input from system clipboard.", async () => {
    // GIVEN
    jest.setTimeout(30000);
    screen.config.resourceDirectory = "./e2e/assets";
    await run("gnome-calculator");
    await confirm();

    // WHEN

    // THEN
    await expect(screen).toShow("calculator.png");
    await close();
  });
});
