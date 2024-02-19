import Jimp from "jimp";
import { ColorMode } from "../enums/colormode.enum";
import { Image } from "../objects/image.class";

export function imageToJimp(image: Image): Jimp {
  const jimpImage = new Jimp({
    data: image.data,
    width: image.width,
    height: image.height
  });
  if (image.colorMode === ColorMode.BGR) {
    // Image treats data in BGR format, so we have to switch red and blue color channels
    jimpImage.scan(
      0,
      0,
      jimpImage.bitmap.width,
      jimpImage.bitmap.height,
      function(_, __, idx) {
        const red = this.bitmap.data[idx];
        this.bitmap.data[idx] = this.bitmap.data[idx + 2];
        this.bitmap.data[idx + 2] = red;
      }
    );
  }
  return jimpImage;
}
