import robot = require("robotjs");
import { Key } from "../../key.enum";
import { KeyboardAction } from "./robotjs-keyboard-action.class";

jest.mock("robotjs");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("robotjs keyboard action", () => {
  it("should forward the keyTap call to robotjs for a known key", () => {
    // GIVEN
    const SUT = new KeyboardAction();

    // WHEN
    SUT.click(Key.A);

    // THEN
    expect(robot.keyTap).toBeCalledTimes(1);
  });

  it("should not forward the keyTap call to robotjs for an unknown key", () => {
    // GIVEN
    const SUT = new KeyboardAction();

    // WHEN
    SUT.click(Key.Add);

    // THEN
    expect(robot.keyTap).not.toBeCalled();
  });

  it("should forward the type call to robotjs", () => {
    // GIVEN
    const SUT = new KeyboardAction();
    const payload = "testInput";

    // WHEN
    SUT.type(payload);

    // THEN
    expect(robot.typeString).toBeCalledTimes(1);
    expect(robot.typeString).toBeCalledWith(payload);
  });

  it("should forward the pressKey call to robotjs for a known key", () => {
    // GIVEN
    const SUT = new KeyboardAction();

    // WHEN
    SUT.pressKey(Key.A);

    // THEN
    expect(robot.keyToggle).toBeCalledTimes(1);
    expect(robot.keyToggle).toBeCalledWith(KeyboardAction.keyLookup(Key.A), "down", []);
  });

  it("should treat a list of keys as modifiers + the actual key to press", () => {
    // GIVEN
    const SUT = new KeyboardAction();

    // WHEN
    SUT.pressKey(Key.LeftControl, Key.A);

    // THEN
    expect(robot.keyToggle).toBeCalledTimes(1);
    expect(robot.keyToggle)
      .toBeCalledWith(KeyboardAction.keyLookup(Key.A), "down", [KeyboardAction.keyLookup(Key.LeftControl)]);
  });

  it("should not forward the pressKey call to robotjs for an unknown key", () => {
    // GIVEN
    const SUT = new KeyboardAction();

    // WHEN
    SUT.pressKey(Key.Add);

    // THEN
    expect(robot.keyToggle).not.toBeCalled();
  });

  it("should forward the releaseKey call to robotjs for a known key", () => {
    // GIVEN
    const SUT = new KeyboardAction();

    // WHEN
    SUT.releaseKey(Key.A);

    // THEN
    expect(robot.keyToggle).toBeCalledTimes(1);
    expect(robot.keyToggle).toBeCalledWith(KeyboardAction.keyLookup(Key.A), "up", []);
  });

  it("should treat a list of keys as modifiers + the actual key to release", () => {
    // GIVEN
    const SUT = new KeyboardAction();

    // WHEN
    SUT.releaseKey(Key.LeftControl, Key.A);

    // THEN
    expect(robot.keyToggle).toBeCalledTimes(1);
    expect(robot.keyToggle)
      .toBeCalledWith(KeyboardAction.keyLookup(Key.A), "up", [KeyboardAction.keyLookup(Key.LeftControl)]);
  });

  it("should not forward the releaseKey call to robotjs for an unknown key", () => {
    // GIVEN
    const SUT = new KeyboardAction();

    // WHEN
    SUT.releaseKey(Key.Add);

    // THEN
    expect(robot.keyToggle).not.toBeCalled();
  });
});
