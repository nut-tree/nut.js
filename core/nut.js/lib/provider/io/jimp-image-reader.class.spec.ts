import ImageReader from "./jimp-image-reader.class";
import { join } from "path";
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

describe("Jimp image reader", () => {
  it("should return an Image object", async () => {
    // GIVEN
    const inputPath = join(__dirname, "__mocks__", "calculator.png");
    const scanMock = jest.fn();
    Jimp.prototype.scan = scanMock;
    const SUT = new ImageReader();

    // WHEN
    await SUT.load(inputPath);

    // THEN
    expect(scanMock).toHaveBeenCalledTimes(1);
    expect(Jimp.read).toHaveBeenCalledTimes(1);
    expect(Jimp.read).toHaveBeenCalledWith(inputPath);
  });

  it("should reject on loading failures", async () => {
    // GIVEN
    const inputPath = "/some/path/to/file";
    const expectedError = "Error during load";
    const SUT = new ImageReader();
    Jimp.read = jest.fn(() => {
      throw new Error(expectedError);
    });

    // WHEN
    try {
      await SUT.load(inputPath);
    } catch (err) {
      // THEN
      expect(err).toStrictEqual(Error(expectedError));
    }
  });
});
