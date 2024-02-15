import { mouse } from "../../../index";
import { Point } from "@nut-tree/shared";
import { toBeAt } from "./toBeAt.function";

const targetPoint = new Point(100, 100);

describe(".toBeAt", () => {
  it("should succeed when cursor is at right position.", async () => {
    mouse.getPosition = jest.fn(() => Promise.resolve(targetPoint));
    const result = await toBeAt(mouse, targetPoint);
    expect(result.pass).toBeTruthy();
  });

  it("should fail when cursor is at wrong position.", async () => {
    mouse.getPosition = jest.fn(() => Promise.resolve(targetPoint));
    const result = await toBeAt(mouse, new Point(10, 10));
    expect(result.pass).toBeFalsy();
  });
});
