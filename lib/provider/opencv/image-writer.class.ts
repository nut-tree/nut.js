import * as cv from "opencv4nodejs-prebuilt";
import {fromImageWithAlphaChannel, fromImageWithoutAlphaChannel} from "./image-processor.class";
import {ImageWriter, ImageWriterParameters} from "../image-writer.type";


export default class implements ImageWriter {
    public async store({data, path}: ImageWriterParameters): Promise<void> {
        let outputMat: cv.Mat;
        if (data.hasAlphaChannel) {
            outputMat = await fromImageWithAlphaChannel(data);
        } else {
            outputMat = await fromImageWithoutAlphaChannel(data);
        }
        return cv.imwriteAsync(path, outputMat);
    }
}
