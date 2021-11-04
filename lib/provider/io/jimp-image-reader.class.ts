import Jimp from 'jimp';
import {ImageReader} from "../image-reader.type";
import {Image} from "../../image.class";

export default class implements ImageReader {
    load(parameters: string): Promise<Image> {
        return new Promise<Image>((resolve, reject) => {
            Jimp.read(parameters)
                .then(jimpImage => {
                    resolve(new Image(
                        jimpImage.bitmap.width,
                        jimpImage.bitmap.height,
                        jimpImage.bitmap.data,
                        jimpImage.hasAlpha() ? 4 : 3
                    ));
                }).catch(err => reject(`Failed to load image from '${parameters}'. Reason: ${err}`));
        })
    }
}
