import * as path from "path";
import { ImageReader } from "./image-reader.class";

describe("Image loader", () => {
  it("should resolve to a non-empty Mat on successful load", async () => {
    // GIVEN
    const SUT = new ImageReader();
    const imagePath = path.resolve(__dirname, "./__mocks__/mouse.png");

    // WHEN
    const result = await SUT.load(imagePath);

    // THEN
    expect(result.height).toBeGreaterThan(0);
    expect(result.width).toBeGreaterThan(0);
  });

  it("loadImage should reject on unsuccessful load", async () => {
    // GIVEN
    const SUT = new ImageReader();
    const imagePath = "./__mocks__/foo.png";

    // WHEN
    const call = SUT.load;

    // THEN
    await expect(call(imagePath)).rejects.toEqual(`Failed to load image from '${imagePath}'`);
  });
});
