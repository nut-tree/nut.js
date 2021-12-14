import { Region } from "./region.class";

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
});
