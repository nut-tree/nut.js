import { isPoint, Point } from "./point.class";

describe("Point", () => {
  it("should return a proper string representation.", () => {
    const point = new Point(10, 15);
    const expected = "(10, 15)";

    expect(point.toString()).toEqual(expected);
  });

  describe("isPoint typeguard", () => {
    it("should identify a Point", () => {
      // GIVEN
      const p = new Point(100, 100);

      // WHEN
      const result = isPoint(p);

      // THEN
      expect(result).toBeTruthy();
    });

    it("should rule out non-objects", () => {
      // GIVEN
      const p = "foo";

      // WHEN
      const result = isPoint(p);

      // THEN
      expect(result).toBeFalsy();
    });

    it("should rule out possible object with missing properties", () => {
      // GIVEN
      const p = {
        x: 100,
      };

      // WHEN
      const result = isPoint(p);

      // THEN
      expect(result).toBeFalsy();
    });

    it("should rule out possible object with wrong property type", () => {
      // GIVEN
      const p = {
        x: 100,
        y: "foo",
      };

      // WHEN
      const result = isPoint(p);

      // THEN
      expect(result).toBeFalsy();
    });
  });
});
