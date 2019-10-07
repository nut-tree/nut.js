import * as cv from "opencv4nodejs-prebuilt";
import { mockPartial } from "sneer";
import { findEdges } from "./find-edges.function";

describe("findEdges", () => {
  it("should convert an image to grayscale and run Canny edge detection", async () => {
    // GIVEN
    const grayImageMock = mockPartial<cv.Mat>({
      cannyAsync: jest.fn()
    });
    const inputImageMock = mockPartial<cv.Mat>({
      cvtColorAsync: jest.fn(() => Promise.resolve(grayImageMock))
    });

    // WHEN
    await findEdges(inputImageMock);

    // THEN
    expect(inputImageMock.cvtColorAsync).toBeCalledWith(cv.COLOR_BGR2GRAY);
    expect(grayImageMock.cannyAsync).toBeCalledWith(50, 200);
  });
});
