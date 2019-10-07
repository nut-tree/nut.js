import { lowerBound, upperBound } from "./bound-value.function";

describe("lowerBound function", () => {
  it.each([
    [5, 10, 1, 1],
    [5, 5, 10, 10],
    [5, 1, 10, 5],
    [0, 0, 0, 0]
  ])("Input: %f, Boundary: %f, minValue: %f, Expected: %f",
    (input: number, boundary: number, minValue: number, expected: number) => {
      // WHEN
      const result = lowerBound(input, boundary, minValue);

      // THEN
      expect(result).toBe(expected);
    });
});

describe("upperBound function", () => {
  it.each([
    [5, 10, 1, 5],
    [5, 5, 10, 10],
    [5, 1, 10, 10],
    [5, 5, 5, 5]
  ])("Input: %f, Boundary: %f, maxValue: %f, Expected: %f",
    (input: number, boundary: number, maxValue: number, expected: number) => {
      // WHEN
      const result = upperBound(input, boundary, maxValue);

      // THEN
      expect(result).toBe(expected);
    });
});
