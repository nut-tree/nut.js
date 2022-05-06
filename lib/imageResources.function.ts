import {join, normalize} from "path";
import {ProviderRegistry} from "./provider/provider-registry.class";
import {URL} from "url";
import {Image} from "./image.class";
import Jimp from "jimp";
import {ColorMode} from "./colormode.enum";

export function loadImageResource(providerRegistry: ProviderRegistry, resourceDirectory: string, fileName: string) {
    const fullPath = normalize(join(resourceDirectory, fileName));
    return providerRegistry.getImageReader().load(fullPath);
}

export async function fetchFromUrl(url: string | URL): Promise<Image> {
    let imageUrl: URL;
    if (url instanceof URL) {
        imageUrl = url;
    } else {
        try {
            imageUrl = new URL(url);
        } catch (e) {
            throw e;
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
                ColorMode.RGB
            );
        })
        .catch(err => {
            throw err;
        });
}