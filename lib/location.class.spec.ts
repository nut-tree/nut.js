import { Location } from "./location.class";
import { Point } from "./point.class";
import { Region } from "./region.class";

describe("Location", () => {
  it("should return the center point of an area.", () => {
    const expected = new Point(2, 2);
    const testRegion = new Region(0, 0, 4, 4);

    expect(Location.centerOf(testRegion)).toEqual(expected);
  });

  it("should return a random point inside of an area.", () => {
    const testRegion = new Region(100, 20, 50, 35);
    const result = Location.randomPointIn(testRegion);
    expect(result.x).toBeGreaterThanOrEqual(testRegion.left);
    expect(result.x).toBeLessThanOrEqual(testRegion.left + testRegion.width);
    expect(result.y).toBeGreaterThanOrEqual(testRegion.top);
    expect(result.y).toBeLessThanOrEqual(testRegion.top + testRegion.height);
  });
});
