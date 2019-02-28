import { resolve } from "path";
import { ImageProcessor } from "./image-processor.class";
import { ImageReader } from "./image-reader.class";

describe("ImageProcessor", () => {
  it("should allow to create a cv.Mat from an Image with alpha channel, alpha channel is dropped", async () => {
    // GIVEN
    const imageReader = new ImageReader();
    const imagePath = resolve(__dirname, "./__mocks__/alpha_channel.png");
    const image = await imageReader.load(imagePath);

    // WHEN
    const mat = await ImageProcessor.fromImageWithAlphaChannel(image);

    // THEN
    expect(image.hasAlphaChannel).toBeTruthy();
    expect(mat.channels).toEqual(3);
    expect(mat.rows).toEqual(image.height);
    expect(mat.cols).toEqual(image.width);
    expect(mat.empty).toBeFalsy();
  });

  it("should allow to create a cv.Mat from an Image without alpha channel", async () => {
    // GIVEN
    const imageReader = new ImageReader();
    const imagePath = resolve(__dirname, "./__mocks__/mouse.png");
    const image = await imageReader.load(imagePath);

    // WHEN
    const mat = await ImageProcessor.fromImageWithoutAlphaChannel(image);

    // THEN
    expect(image.hasAlphaChannel).toBeFalsy();
    expect(mat.channels).toEqual(3);
    expect(mat.rows).toEqual(image.height);
    expect(mat.cols).toEqual(image.width);
    expect(mat.empty).toBeFalsy();
  });
});
