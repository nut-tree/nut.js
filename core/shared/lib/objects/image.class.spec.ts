import { Image, isImage } from "./image.class";
import { imageToJimp } from "../functions/imageToJimp.function";
import { ColorMode } from "../enums/colormode.enum";

jest.mock("../functions/imageToJimp.function", () => {
  return {
    imageToJimp: jest.fn(),
  };
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Image class", () => {
  it("should return alphachannel = true for > 3 channels", () => {
    const SUT = new Image(200, 200, Buffer.from([123]), 4, "id", 4, 200 * 4);
    expect(SUT.hasAlphaChannel).toBeTruthy();
  });

  it("should return alphachannel = false for <= 3 channels", () => {
    const SUT = new Image(200, 200, Buffer.from([123]), 3, "id", 4, 200 * 4);
    expect(SUT.hasAlphaChannel).toBeFalsy();
  });
  it("should return alphachannel = false for <= 3 channels", () => {
    const SUT = new Image(200, 200, Buffer.from([123]), 2, "id", 4, 200 * 4);
    expect(SUT.hasAlphaChannel).toBeFalsy();
  });
  it("should return alphachannel = false for <= 3 channels", () => {
    const SUT = new Image(200, 200, Buffer.from([123]), 1, "id", 4, 200 * 4);
    expect(SUT.hasAlphaChannel).toBeFalsy();
  });

  it("should throw for <= 0 channels", () => {
    expect(
      () => new Image(200, 200, Buffer.from([123]), 0, "id", 4, 200 * 4)
    ).toThrowError("Channel <= 0");
  });

  it("should have a default pixel density of 1.0", () => {
    const SUT = new Image(200, 200, Buffer.from([123]), 1, "id", 4, 200 * 4);
    expect(SUT.pixelDensity).toEqual({ scaleX: 1.0, scaleY: 1.0 });
  });

  describe("Colormode", () => {
    it("should not try to convert an image to BGR if it already has the correct color mode", async () => {
      // GIVEN
      const bgrImage = new Image(
        100,
        100,
        Buffer.from([]),
        3,
        "testImage",
        4,
        200 * 4
      );

      // WHEN
      const convertedImage = await bgrImage.toBGR();

      // THEN
      expect(convertedImage).toBe(bgrImage);
      expect(imageToJimp).not.toHaveBeenCalledTimes(1);
    });

    it("should not try to convert an image to RGB if it already has the correct color mode", async () => {
      // GIVEN
      const rgbImage = new Image(
        100,
        100,
        Buffer.from([]),
        3,
        "testImage",
        4,
        200 * 4,
        ColorMode.RGB
      );

      // WHEN
      const convertedImage = await rgbImage.toRGB();

      // THEN
      expect(convertedImage).toBe(rgbImage);
      expect(imageToJimp).not.toHaveBeenCalledTimes(1);
    });
  });

  describe("isImage typeguard", () => {
    it("should identify an Image", () => {
      // GIVEN
      const img = new Image(100, 100, Buffer.from([]), 4, "foo", 4, 200 * 4);

      // WHEN
      const result = isImage(img);

      // THEN
      expect(result).toBeTruthy();
    });

    it("should rule out non-objects", () => {
      // GIVEN
      const i = "foo";

      // WHEN
      const result = isImage(i);

      // THEN
      expect(result).toBeFalsy();
    });

    it("should rule out possible object with missing properties", () => {
      // GIVEN
      const img = {
        width: 100,
        height: 100,
        data: Buffer.from([]),
        channels: "foo",
        id: "foo",
        colorMode: ColorMode.BGR,
      };

      // WHEN
      const result = isImage(img);

      // THEN
      expect(result).toBeFalsy();
    });

    it("should rule out possible object with wrong property type", () => {
      // GIVEN
      const img = {
        width: 100,
        height: 100,
        data: Buffer.from([]),
        channels: "foo",
        id: "foo",
        colorMode: ColorMode.BGR,
        pixelDensity: 25,
      };

      // WHEN
      const result = isImage(img);

      // THEN
      expect(result).toBeFalsy();
    });
  });
});
