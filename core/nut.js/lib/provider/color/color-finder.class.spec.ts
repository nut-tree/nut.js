import ColorFinder from "./color-finder.class";
import { join } from "path";
import {
  ColorQuery,
  loadImage,
  MatchRequest,
  MatchResult,
  Point,
  RGBA,
} from "../../../index";

describe("color finder", () => {
  describe("find", () => {
    it("should resolve", async () => {
      // GIVEN
      const screenImage = await loadImage(
        join(__dirname, `../../../assets/dot.png`)
      );
      const SUT = new ColorFinder();
      const colorQuery: ColorQuery = {
        id: "colorFinderTest",
        type: "color",
        by: {
          color: new RGBA(255, 0, 0, 255),
        },
      };
      const matchRequest = new MatchRequest(screenImage, colorQuery, 0.9);

      const expectedResult = new MatchResult(1, new Point(60, 60));

      // WHEN
      const result = await SUT.findMatch(matchRequest);

      // THEN
      expect(result).toEqual(expectedResult);
    });
  });

  describe("findAll", () => {
    it("should resolve", async () => {
      // GIVEN
      const screenImage = await loadImage(
        join(__dirname, `../../../assets/dots.png`)
      );
      const SUT = new ColorFinder();
      const colorQuery: ColorQuery = {
        id: "colorFinderTest",
        type: "color",
        by: {
          color: new RGBA(255, 0, 0, 255),
        },
      };
      const matchRequest = new MatchRequest(screenImage, colorQuery, 0.9);

      const expectedResult = [
        new MatchResult(1, new Point(60, 60)),
        new MatchResult(1, new Point(60, 80)),
        new MatchResult(1, new Point(60, 100)),
      ];

      // WHEN
      const result = await SUT.findMatches(matchRequest);

      // THEN
      expect(result).toEqual(expectedResult);
    });
  });
});
