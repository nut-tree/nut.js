import * as cv from "opencv4nodejs-prebuilt";
import {Image} from "../../image.class";
import {DataSink} from "./data-sink.interface";
import {fromImageWithAlphaChannel, fromImageWithoutAlphaChannel} from "./image-processor.class";

export class ImageWriter implements DataSink {
    public async store(data: Image, path: string): Promise<void> {
        let outputMat: cv.Mat;
        if (data.hasAlphaChannel) {
            outputMat = await fromImageWithAlphaChannel(data);
        } else {
            outputMat = await fromImageWithoutAlphaChannel(data);
        }
        return cv.imwriteAsync(path, outputMat);
    }
}
