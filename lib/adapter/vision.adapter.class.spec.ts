import { Image } from "../image.class";
import { MatchRequest } from "../match-request.class";
import { TemplateMatchingFinder } from "../provider/opencv/template-matching-finder.class";
import { Region } from "../region.class";
import { VisionAdapter } from "./vision.adapter.class";

jest.mock("../provider/opencv/template-matching-finder.class");

describe("Native adapter class", () => {
  it("should delegate calls to findImage", () => {
    // GIVEN
    const finderMock = new TemplateMatchingFinder();
    const SUT = new VisionAdapter(finderMock);
    const request = new MatchRequest(
      new Image(100, 100, new ArrayBuffer(0), 3),
      "foo",
      new Region(0, 0, 100, 100),
      0.99,
      true);

    // WHEN
    SUT.findOnScreenRegion(request);

    expect(finderMock.findMatch).toBeCalledTimes(1);
    expect(finderMock.findMatch).toBeCalledWith(request);
  });
});
