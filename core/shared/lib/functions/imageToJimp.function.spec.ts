import { imageToJimp } from "./imageToJimp.function";
import Jimp from "jimp";
import { Image } from "../objects/image.class";

jest.mock("jimp", () => {
  class JimpMock {
    bitmap = {
      width: 100,
      height: 100,
      data: Buffer.from([])
    };
    hasAlpha = () => false;
    static read = jest.fn(() => Promise.resolve(new JimpMock()));
  }

  return {
    __esModule: true,
    default: JimpMock
  };
});

afterEach(() => jest.resetAllMocks());

describe("imageToJimp", () => {
  it("should successfully convert an Image to a Jimp instance", async () => {
    // GIVEN
    const scanMock = jest.fn();
    Jimp.prototype.scan = scanMock;
    const inputImage = new Image(
      1,
      1,
      Buffer.from([0, 0, 0]),
      3,
      "input_image",
      4,
      4
    );

    // WHEN
    const result = await imageToJimp(inputImage);

    // THEN
    expect(result).toBeInstanceOf(Jimp);
    expect(scanMock).toHaveBeenCalledTimes(1);
  });
});
