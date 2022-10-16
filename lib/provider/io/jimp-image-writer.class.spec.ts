import ImageWriter from "./jimp-image-writer.class";
import { Image } from "../../image.class";
import Jimp from "jimp";

jest.mock("jimp", () => {
  class JimpMock {
    bitmap = {
      width: 100,
      height: 100,
      data: Buffer.from([]),
    };
    hasAlpha = () => false;
    static read = jest.fn(() => Promise.resolve(new JimpMock()));
  }

  return {
    __esModule: true,
    default: JimpMock,
  };
});

afterEach(() => jest.resetAllMocks());

describe("Jimp image writer", () => {
  it("should reject on writing failures", async () => {
    // GIVEN
    const outputFileName = "/does/not/compute.png";
    const outputFile = new Image(100, 200, Buffer.from([]), 3, outputFileName);
    const writeMock = jest.fn(() => Promise.resolve(new Jimp()));
    const scanMock = jest.fn();
    Jimp.prototype.scan = scanMock;
    Jimp.prototype.writeAsync = writeMock;
    const SUT = new ImageWriter();

    // WHEN
    await SUT.store({ image: outputFile, path: outputFileName });

    // THEN
    expect(scanMock).toHaveBeenCalledTimes(1);
    expect(writeMock).toHaveBeenCalledTimes(1);
    expect(writeMock).toHaveBeenCalledWith(outputFileName);
  });
});
