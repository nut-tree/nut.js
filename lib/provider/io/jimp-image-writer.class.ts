import { ImageWriter, ImageWriterParameters } from "../image-writer.type";
import { imageToJimp } from "./imageToJimp.function";

export default class implements ImageWriter {
  store(parameters: ImageWriterParameters): Promise<void> {
    return new Promise((resolve, reject) => {
      const jimpImage = imageToJimp(parameters.image);
      jimpImage
        .writeAsync(parameters.path)
        .then((_) => resolve())
        .catch((err) => reject(err));
    });
  }
}
