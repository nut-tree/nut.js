import { fetchFromUrl, loadImageResource } from "./imageResources.function";
import { mockPartial } from "sneer";
import { ImageReader, ProviderRegistry } from "@nut-tree/provider-interfaces";
import { join } from "path";
import { ColorMode } from "@nut-tree/shared";

const loadMock = jest.fn();
const providerRegistryMock = mockPartial<ProviderRegistry>({
  getImageReader(): ImageReader {
    return mockPartial<ImageReader>({
      load: loadMock
    });
  }
});

describe("imageResources", () => {
  it("should retrieve an ImageReader via providerRegistry and load an image relative to the provided resourceDirectory", async () => {
    // GIVEN
    const resourceDirectoryPath = "/foo/bar";
    const imageFileName = "image.png";

    // WHEN
    await loadImageResource(
      providerRegistryMock,
      resourceDirectoryPath,
      imageFileName
    );

    // THEN
    expect(loadMock).toHaveBeenCalledWith(join(resourceDirectoryPath, imageFileName));
  });
});

describe("fetchFromUrl", () => {
  it("should throw on malformed URLs", async () => {
    // GIVEN
    const malformedUrl = "foo";

    // WHEN
    const SUT = () => fetchFromUrl(malformedUrl);

    // THEN
    await expect(SUT).rejects.toThrowError(
      "Failed to fetch image data. Reason: Invalid URL"
    );
  });

  it("should throw on non-image URLs", async () => {
    // GIVEN
    const nonImageUrl = "https://www.npmjs.com/package/jimp";

    // WHEN
    const SUT = () => fetchFromUrl(nonImageUrl);

    // THEN
    await expect(SUT).rejects.toThrowError(
      "Failed to parse image data. Reason: Could not find MIME for Buffer"
    );
  });

  it("should return an RGB image from a valid URL", async () => {
    // GIVEN
    const validImageUrl =
      "https://github.com/nut-tree/nut.js/raw/master/.gfx/nut.png";
    const expectedDimensions = {
      width: 502,
      height: 411
    };
    const expectedColorMode = ColorMode.RGB;

    // WHEN
    const rgbImage = await fetchFromUrl(validImageUrl);

    // THEN
    expect(rgbImage.colorMode).toBe(expectedColorMode);
    expect(rgbImage.width).toBe(expectedDimensions.width);
    expect(rgbImage.height).toBe(expectedDimensions.height);
  });
});
