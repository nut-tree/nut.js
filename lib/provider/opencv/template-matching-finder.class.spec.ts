import * as path from "path";
import { Image } from "../../image.class";
import { MatchRequest } from "../../match-request.class";
import { Region } from "../../region.class";
import { ImageReader } from "./image-reader.class";
import { TemplateMatchingFinder } from "./template-matching-finder.class";

describe("Template-matching finder", () => {
  it("findMatch should return a match when present in image", async () => {
    // GIVEN
    const imageLoader = new ImageReader();
    const SUT = new TemplateMatchingFinder();
    const imagePath = path.resolve(__dirname, "./__mocks__/mouse.png");
    const needle = await imageLoader.load(imagePath);
    const minConfidence = 0.99;
    const searchRegion = new Region(0, 0, needle.width, needle.height);
    const haystack = new Image(needle.width, needle.height, needle.data, 3);
    const matchRequest = new MatchRequest(haystack, imagePath, searchRegion, minConfidence);

    // WHEN
    const result = await SUT.findMatch(matchRequest);

    // THEN
    expect(result.confidence).toBeGreaterThanOrEqual(minConfidence);
    expect(result.location).toEqual(searchRegion);
  });

  it("findMatch should return a match within a search region when present in image", async () => {
    // GIVEN
    const imageLoader = new ImageReader();
    const SUT = new TemplateMatchingFinder();
    const imagePath = path.resolve(__dirname, "./__mocks__/mouse.png");
    const needle = await imageLoader.load(imagePath);
    const minConfidence = 0.99;
    const searchRegion = new Region(10, 20, 100, 100);
    const haystack = new Image(needle.width, needle.height, needle.data, 3);
    const matchRequest = new MatchRequest(haystack, imagePath, searchRegion, minConfidence);

    // WHEN
    const result = await SUT.findMatch(matchRequest);

    // THEN
    expect(result.confidence).toBeGreaterThanOrEqual(minConfidence);
    expect(result.location).toEqual(searchRegion);
  });

  it("findMatch should throw on invalid image paths", async () => {
    // GIVEN
    const imageLoader = new ImageReader();
    const SUT = new TemplateMatchingFinder();
    const pathToNeedle = path.resolve(__dirname, "./__mocks__/mouse.png");
    const pathToHaystack = "./__mocks__/foo.png";
    const needle = await imageLoader.load(pathToNeedle);
    const minConfidence = 0.99;
    const searchRegion = new Region(0, 0, 100, 100);
    const haystack = new Image(needle.width, needle.height, needle.data, 3);
    const matchRequest = new MatchRequest(haystack, pathToHaystack, searchRegion, minConfidence);

    // WHEN
    const result = SUT.findMatch(matchRequest);

    // THEN
    expect(result).rejects.toEqual(`Failed to load image from '${pathToHaystack}'`);
  });
});
