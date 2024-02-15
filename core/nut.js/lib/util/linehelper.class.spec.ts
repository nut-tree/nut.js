import { Point } from "@nut-tree/shared";
import { LineHelper } from "./linehelper.class";

describe("LineHelper", () => {
  it("should return a diagonal line from (0,0) to (10,10)", () => {
    const SUT = new LineHelper();

    const from = new Point(0, 0);
    const to = new Point(10, 10);

    const expected: Point[] = [];
    for (let idx = 0; idx <= to.x; ++idx) {
      expected.push(new Point(idx, idx));
    }
    const result = SUT.straightLine(from, to);
    expect(result.length).toBe(expected.length);
    for (let idx = 0; idx < result.length; ++idx) {
      expect(result[idx]).toEqual(expected[idx]);
    }
  });

  it("should return a diagonal line from (10,10) to (0,0)", () => {
    const SUT = new LineHelper();

    const from = new Point(10, 10);
    const to = new Point(0, 0);

    const expected: Point[] = [];
    for (let idx = 10; idx >= to.x; --idx) {
      expected.push(new Point(idx, idx));
    }
    const result = SUT.straightLine(from, to);
    expect(result.length).toBe(expected.length);
    for (let idx = 0; idx < result.length; ++idx) {
      expect(result[idx]).toEqual(expected[idx]);
    }
  });
});
