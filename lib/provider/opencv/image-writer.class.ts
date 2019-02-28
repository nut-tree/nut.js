import * as cv from "opencv4nodejs";
import { Image } from "../../image.class";
import { DataSink } from "./data-sink.interface";
import { ImageProcessor } from "./image-processor.class";

export class ImageWriter implements DataSink {
  public async store(data: Image, path: string): Promise<void> {
    let outputMat: cv.Mat;
    if (data.hasAlphaChannel) {
      outputMat = await ImageProcessor.fromImageWithAlphaChannel(data);
    } else {
      outputMat = await ImageProcessor.fromImageWithoutAlphaChannel(data);
    }
    return cv.imwriteAsync(path, outputMat);
  }
}
