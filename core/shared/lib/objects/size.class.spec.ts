import { isSize, Size } from "./size.class";

describe("Size", () => {
  it("should calculate the correct area of a Size", () => {
    const size = new Size(100, 100);
    const expected = size.width * size.height;

    expect(size.area()).toEqual(expected);
  });

  it("should return a proper string representation", () => {
    const size = new Size(100, 100);
    const expected = "(100x100)";

    expect(size.toString()).toEqual(expected);
  });

  describe("isSize typeguard", () => {
    it("should identify a Size object", () => {
      // GIVEN
      const s = new Size(100, 100);

      // WHEN
      const result = isSize(s);

      // THEN
      expect(result).toBeTruthy();
    });

    it("should rule out non-size objects", () => {
      // GIVEN
      const r = "foo";

      // WHEN
      const result = isSize(r);

      // THEN
      expect(result).toBeFalsy();
    });

    it("should rule out possible object with missing properties", () => {
      // GIVEN
      const r = {
        width: 100,
      };

      // WHEN
      const result = isSize(r);

      // THEN
      expect(result).toBeFalsy();
    });

    it("should rule out possible object with wrong property type", () => {
      // GIVEN
      const r = {
        width: "foo",
        height: 200,
      };

      // WHEN
      const result = isSize(r);

      // THEN
      expect(result).toBeFalsy();
    });
  });
});
