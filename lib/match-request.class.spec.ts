import { Image } from "./image.class";
import { MatchRequest } from "./match-request.class";

jest.mock("jimp", () => {});

describe("MatchRequest", () => {
  it("should default to multi-scale matching", () => {
    const SUT = new MatchRequest(
      new Image(100, 100, Buffer.from([]), 3, "haystack_image"),
      new Image(100, 100, Buffer.from([]), 3, "needle_image"),
      0.99
    );

    expect(SUT.searchMultipleScales).toBeTruthy();
  });
});
