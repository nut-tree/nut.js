import { join, normalize } from "path";
import { URL } from "url";
import { ColorMode, Image } from "@nut-tree/shared";
import Jimp from "jimp";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";

export function loadImageResource(
  providerRegistry: ProviderRegistry,
  resourceDirectory: string,
  fileName: string
) {
  const fullPath = normalize(join(resourceDirectory, fileName));
  return providerRegistry.getImageReader().load(fullPath);
}

/**
 * fetchFromUrl loads remote image content at runtime to provide it for further use in on-screen image search
 * @param url The remote URl to fetch an image from as string or {@link URL}
 * @throws On malformed URL input or in case of non-image remote content
 */
export async function fetchFromUrl(url: string | URL): Promise<Image> {
  let imageUrl: URL;
  if (url instanceof URL) {
    imageUrl = url;
  } else {
    try {
      imageUrl = new URL(url);
    } catch (e: any) {
      throw new Error(`Failed to fetch image data. Reason: ${e.message}`);
    }
  }
  return Jimp.read(imageUrl.href)
    .then((image) => {
      return new Image(
        image.bitmap.width,
        image.bitmap.height,
        image.bitmap.data,
        4,
        imageUrl.href,
        image.bitmap.data.length / (image.bitmap.width * image.bitmap.height),
        image.bitmap.data.length / image.bitmap.height,
        ColorMode.RGB
      );
    })
    .catch((err) => {
      throw new Error(`Failed to parse image data. Reason: ${err.message}`);
    });
}
