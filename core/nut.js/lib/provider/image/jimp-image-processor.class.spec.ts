import { Image, Point } from "@nut-tree/shared";
import JimpImageProcessor from "./jimp-image-processor.class";

const imageWidth = 10;
const imageHeight = 20;

describe("JimpImageProcessor", () => {
  it.each([[new Point(-1, 5)], [new Point(imageWidth + 5, 5)]])(
    `should reject on out of bounds x coordinates`,
    async (outOfBoundsPoint: Point) => {
      // GIVEN
      const inputImage = new Image(
        imageWidth,
        imageHeight,
        Buffer.from([0, 0, 0]),
        3,
        "input_image",
        4,
        4
      );
      const SUT = new JimpImageProcessor();

      // WHEN
      const result = SUT.colorAt(inputImage, outOfBoundsPoint);

      // THEN
      await expect(result).rejects.toThrowError(
        `Query location out of bounds. Should be in range 0 <= x < image.width, is ${outOfBoundsPoint.x}`
      );
    }
  );

  it.each([[new Point(5, -1)], [new Point(5, imageHeight + 10)]])(
    `should reject on out of bounds y coordinates`,
    async (outOfBoundsPoint: Point) => {
      // GIVEN
      const imageWidth = 10;
      const imageHeight = 20;
      const inputImage = new Image(
        imageWidth,
        imageHeight,
        Buffer.from([0, 0, 0]),
        3,
        "input_image",
        4,
        4
      );
      const SUT = new JimpImageProcessor();

      // WHEN
      const result = SUT.colorAt(inputImage, outOfBoundsPoint);

      // THEN
      await expect(result).rejects.toThrowError(
        `Query location out of bounds. Should be in range 0 <= y < image.height, is ${outOfBoundsPoint.y}`
      );
    }
  );
});
