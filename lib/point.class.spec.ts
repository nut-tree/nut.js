import { Point } from "./point.class";

describe("Point", () => {
  it("should return a proper string representation.", () => {
    const point = new Point(10, 15);
    const expected = "(10, 15)";

    expect(point.toString()).toEqual(expected);
  });
});
