import { centerOf, randomPointIn } from "./location.function";
import { Point, Region } from "@nut-tree/shared";

describe("Location", () => {
  describe("centerOf", () => {
    it("should return the center point of an area.", () => {
      const expected = new Point(2, 2);
      const testRegion = new Region(0, 0, 4, 4);

      expect(centerOf(testRegion)).resolves.toEqual(expected);
    });

    it("should throw on non Region input", async () => {
      const testRegion = {
        left: 0,
        top: 0,
        width: 4
      };

      await expect(centerOf(testRegion as Region)).rejects.toThrowError(
        /^centerOf requires a Region, but received/
      );
    });
  });

  describe("randomPointIn", () => {
    it("should return a random point inside of an area.", async () => {
      const testRegion = new Region(100, 20, 50, 35);
      const result = await randomPointIn(testRegion);
      expect(result.x).toBeGreaterThanOrEqual(testRegion.left);
      expect(result.x).toBeLessThanOrEqual(testRegion.left + testRegion.width);
      expect(result.y).toBeGreaterThanOrEqual(testRegion.top);
      expect(result.y).toBeLessThanOrEqual(testRegion.top + testRegion.height);
    });

    it("should throw on non Region input", async () => {
      const testRegion = {
        left: 0,
        top: 0,
        width: 4
      };

      await expect(randomPointIn(testRegion as Region)).rejects.toThrowError(
        /^randomPointIn requires a Region, but received/
      );
    });
  });
});
