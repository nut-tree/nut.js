import { screen } from "../../../index";
import { Point, RGBA } from "@nut-tree/shared";
import { mockPartial } from "sneer";
import { toHaveColor } from "./toHaveColor.function";

// jest.mock("jimp", () => {});

const targetPoint = new Point(400, 400);

describe(".toHaveColor", () => {
  it("should succeed when screen pixel has the correct RGBA value", async () => {
    // GIVEN
    screen.colorAt = mockPartial(() => {
      return new RGBA(0, 0, 0, 0);
    });

    // WHEN
    const result = await toHaveColor(targetPoint, new RGBA(0, 0, 0, 0));

    // THEN
    expect(result.pass).toBeTruthy();
  });

  it("should fail when the screen pixel has the incorrect RGBA value", async () => {
    // GIVEN
    screen.colorAt = mockPartial(() => {
      return new RGBA(255, 0, 5, 0);
    });

    // WHEN
    const result = await toHaveColor(targetPoint, new RGBA(0, 0, 0, 0));

    // THEN
    expect(result.pass).toBeFalsy();
  });

  it("should succeed when the screen pixel has the correct RGBA value", async () => {
    // GIVEN
    screen.colorAt = mockPartial(() => {
      return new RGBA(0, 0, 0, 0);
    });
    expect.extend({
      toHaveColor
    });

    // WHEN

    // THEN
    await expect(targetPoint).toHaveColor(new RGBA(0, 0, 0, 0));
  });

  it("should succeed when the screen pixel has the incorrect RGBA value", async () => {
    // GIVEN
    screen.colorAt = mockPartial(() => {
      return new RGBA(255, 0, 5, 0);
    });
    expect.extend({
      toHaveColor
    });

    // WHEN

    // THEN
    await expect(targetPoint).not.toHaveColor(new RGBA(0, 0, 0, 0));
  });
});
