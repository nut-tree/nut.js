import { isRegion, Region } from "./region.class";

describe("Region", () => {
  it("should calculate the correct area of a region", () => {
    const region = new Region(0, 0, 100, 100);
    const expected = 10000;

    expect(region.area()).toEqual(expected);
  });

  it("should return a proper string representation", () => {
    const region = new Region(0, 0, 100, 100);
    const expected = "(0, 0, 100, 100)";

    expect(region.toString()).toEqual(expected);
  });

  describe("isRegion typeguard", () => {
    it("should identify a Region", () => {
      // GIVEN
      const r = new Region(100, 100, 100, 100);

      // WHEN
      const result = isRegion(r);

      // THEN
      expect(result).toBeTruthy();
    });

    it("should rule out non-objects", () => {
      // GIVEN
      const r = "foo";

      // WHEN
      const result = isRegion(r);

      // THEN
      expect(result).toBeFalsy();
    });

    it("should rule out possible object with missing properties", () => {
      // GIVEN
      const r = {
        left: 100,
        top: 100,
        width: 100,
      };

      // WHEN
      const result = isRegion(r);

      // THEN
      expect(result).toBeFalsy();
    });

    it("should rule out possible object with wrong property type", () => {
      // GIVEN
      const r = {
        left: 100,
        top: "foo",
        width: 100,
        height: 200,
      };

      // WHEN
      const result = isRegion(r);

      // THEN
      expect(result).toBeFalsy();
    });
  });
});
