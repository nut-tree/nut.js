import * as path from "path";
import { Image } from "../../image.class";
import { MatchRequest } from "../../match-request.class";
import { Region } from "../../region.class";
import { TemplateMatchingFinder } from "./template-matching-finder.class";

describe("Template-matching finder", () => {
  it("loadImage should resolve to a non-empty Mat on successful load", async () => {
    // GIVEN
    const SUT = new TemplateMatchingFinder();
    const imagePath = path.resolve(__dirname, "./__mocks__/mouse.png");

    // WHEN
    const result = await SUT.loadImage(imagePath);

    // THEN
    expect(result.rows).toBeGreaterThan(0);
    expect(result.cols).toBeGreaterThan(0);
    expect(result.empty).toBeFalsy();
  });

  it("loadImage should reject on unsuccessful load", async () => {
    // GIVEN
    const SUT = new TemplateMatchingFinder();
    const imagePath = "./__mocks__/foo.png";

    // WHEN
    const call = SUT.loadImage;

    // THEN
    await expect(call(imagePath)).rejects.toEqual("empty Mat");
  });

  it("findMatch should return a match when present in image", async () => {
    // GIVEN
    const SUT = new TemplateMatchingFinder();
    const imagePath = path.resolve(__dirname, "./__mocks__/mouse.png");
    const needle = await SUT.loadImage(imagePath);
    const minConfidence = 0.99;
    const searchRegion = new Region(0, 0, needle.cols, needle.rows);
    const haystack = new Image(needle.cols, needle.rows, needle.getData(), 3);
    const matchRequest = new MatchRequest(haystack, imagePath, searchRegion, minConfidence);

    // WHEN
    const result = await SUT.findMatch(matchRequest);

    // THEN
    expect(result.confidence).toBeGreaterThanOrEqual(minConfidence);
    expect(result.location).toEqual(searchRegion);
  });

  it("findMatch should return a match within a search region when present in image", async () => {
    // GIVEN
    const SUT = new TemplateMatchingFinder();
    const imagePath = path.resolve(__dirname, "./__mocks__/mouse.png");
    const needle = await SUT.loadImage(imagePath);
    const minConfidence = 0.99;
    const searchRegion = new Region(10, 20, 100, 100);
    const haystack = new Image(needle.cols, needle.rows, needle.getData(), 3);
    const matchRequest = new MatchRequest(haystack, imagePath, searchRegion, minConfidence);

    // WHEN
    const result = await SUT.findMatch(matchRequest);

    // THEN
    expect(result.confidence).toBeGreaterThanOrEqual(minConfidence);
    expect(result.location).toEqual(searchRegion);
  });

  it("findMatch should throw on invalid image paths", async () => {
    // GIVEN
    const SUT = new TemplateMatchingFinder();
    const imagePath = path.resolve(__dirname, "./__mocks__/foo.png");

    // WHEN
    const call = await SUT.loadImage;

    // THEN
    await expect(call(imagePath)).rejects.toEqual("empty Mat");
  });
});
