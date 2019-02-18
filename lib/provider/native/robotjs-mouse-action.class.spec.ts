import robot = require("robotjs");
import { Button } from "../../button.enum";
import { Point } from "../../point.class";
import { MouseAction } from "./robotjs-mouse-action.class";

jest.mock("robotjs");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("robotjs mouse action", () => {
  it("should forward leftClick call to robotjs", () => {
    // GIVEN
    const SUT = new MouseAction();

    // WHEN
    SUT.leftClick();

    // THEN
    expect(robot.mouseClick).toBeCalledTimes(1);
    expect(robot.mouseClick).toBeCalledWith("left");
  });

  it("should forward middleClick call to robotjs", () => {
    // GIVEN
    const SUT = new MouseAction();

    // WHEN
    SUT.middleClick();

    // THEN
    expect(robot.mouseClick).toBeCalledTimes(1);
    expect(robot.mouseClick).toBeCalledWith("middle");
  });

  it("should forward rightClick call to robotjs", () => {
    // GIVEN
    const SUT = new MouseAction();

    // WHEN
    SUT.rightClick();

    // THEN
    expect(robot.mouseClick).toBeCalledTimes(1);
    expect(robot.mouseClick).toBeCalledWith("right");
  });

  it("should forward pressButton call to robotjs with state 'down'", () => {
    // GIVEN
    const SUT = new MouseAction();

    // WHEN
    SUT.pressButton(Button.LEFT);

    // THEN
    expect(robot.mouseToggle).toBeCalledTimes(1);
    expect(robot.mouseToggle).toBeCalledWith("down", expect.any(String));
  });

  it("should forward pressButton call to robotjs with state 'up'", () => {
    // GIVEN
    const SUT = new MouseAction();

    // WHEN
    SUT.releaseButton(Button.LEFT);

    // THEN
    expect(robot.mouseToggle).toBeCalledTimes(1);
    expect(robot.mouseToggle).toBeCalledWith("up", expect.any(String));
  });

  it("should forward scrollUp call to robotjs with positive y value", () => {
    // GIVEN
    const SUT = new MouseAction();
    const scrollAmount = 5;

    // WHEN
    SUT.scrollUp(scrollAmount);

    // THEN
    expect(robot.scrollMouse).toBeCalledTimes(1);
    expect(robot.scrollMouse).toBeCalledWith(0, scrollAmount);
  });

  it("should forward scrollDown call to robotjs with negative y value", () => {
    // GIVEN
    const SUT = new MouseAction();
    const scrollAmount = 5;

    // WHEN
    SUT.scrollDown(scrollAmount);

    // THEN
    expect(robot.scrollMouse).toBeCalledTimes(1);
    expect(robot.scrollMouse).toBeCalledWith(0, -scrollAmount);
  });

  it("should forward scrollLeft call to robotjs with negative x value", () => {
    // GIVEN
    const SUT = new MouseAction();
    const scrollAmount = 5;

    // WHEN
    SUT.scrollLeft(scrollAmount);

    // THEN
    expect(robot.scrollMouse).toBeCalledTimes(1);
    expect(robot.scrollMouse).toBeCalledWith(-scrollAmount, 0);
  });

  it("should forward scrollRight call to robotjs with negative x value", () => {
    // GIVEN
    const SUT = new MouseAction();
    const scrollAmount = 5;

    // WHEN
    SUT.scrollRight(scrollAmount);

    // THEN
    expect(robot.scrollMouse).toBeCalledTimes(1);
    expect(robot.scrollMouse).toBeCalledWith(scrollAmount, 0);
  });

  it("should return the current mouse position via robotjs", () => {
    // GIVEN
    robot.getMousePos = jest.fn(() => ({x: 10, y: 100}));
    const SUT = new MouseAction();

    // WHEN
    const currentPosition = SUT.currentMousePosition();

    // THEN
    expect(currentPosition.x).toEqual(10);
    expect(currentPosition.y).toEqual(100);
  });

  it("should set the current mouse position via robotjs", () => {
    // GIVEN
    const SUT = new MouseAction();

    // WHEN
    SUT.setMousePosition(new Point(10, 100));

    // THEN
    expect(robot.moveMouse).toBeCalledTimes(1);
    expect(robot.moveMouse).toBeCalledWith(10, 100);
  });
});
