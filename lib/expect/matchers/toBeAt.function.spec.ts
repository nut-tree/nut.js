import { Controller } from "../../../index";
import { Point } from "../../point.class";
import { toBeAt } from "./toBeAt.function";

const control = new Controller();
const targetPoint = new Point(100, 100);

describe(".toBeAt", () => {
  beforeEach(() => {
    control.mouse.setPosition(targetPoint);
  });

  it("should succeed when cursor is at right position.", async () => {
    const result = await toBeAt(control.mouse, targetPoint);
    expect(result.pass).toBeTruthy();
  });

  it("should fail when cursor is at wrong position.", async () => {
    const result = await toBeAt(control.mouse, new Point(10, 10));
    expect(result.pass).toBeFalsy();
  });
});
