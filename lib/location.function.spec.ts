import { centerOf, randomPointIn } from "./location.function";
import { Point } from "./point.class";
import { Region } from "./region.class";

describe("Location", () => {
  it("should return the center point of an area.", () => {
    const expected = new Point(2, 2);
    const testRegion = new Region(0, 0, 4, 4);

    expect(centerOf(testRegion)).resolves.toEqual(expected);
  });

  it("should return a random point inside of an area.", async () => {
    const testRegion = new Region(100, 20, 50, 35);
    const result = await randomPointIn(testRegion);
    expect(result.x).toBeGreaterThanOrEqual(testRegion.left);
    expect(result.x).toBeLessThanOrEqual(testRegion.left + testRegion.width);
    expect(result.y).toBeGreaterThanOrEqual(testRegion.top);
    expect(result.y).toBeLessThanOrEqual(testRegion.top + testRegion.height);
  });
});
