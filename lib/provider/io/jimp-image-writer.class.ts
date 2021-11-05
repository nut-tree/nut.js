import Jimp from 'jimp';
import {ImageWriter, ImageWriterParameters} from "../image-writer.type";

export default class implements ImageWriter {
    store(parameters: ImageWriterParameters): Promise<void> {
        return new Promise((resolve, reject) => {
            const jimpImage = new Jimp({
                data: parameters.data.data,
                width: parameters.data.width,
                height: parameters.data.height
            });
            // libnut returns data in BGR format, so we have to switch red and blue color channels
            jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, function (_, __, idx) {
                const red = this.bitmap.data[idx];
                this.bitmap.data[idx] = this.bitmap.data[idx + 2];
                this.bitmap.data[idx + 2] = red;
            });
            jimpImage
                .writeAsync(parameters.path)
                .then(_ => resolve())
                .catch(err => reject(err));
        });
    }
}
