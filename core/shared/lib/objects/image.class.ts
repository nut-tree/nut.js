import { imageToJimp } from "../functions/imageToJimp.function";
import { ColorMode } from "../enums/colormode.enum";

/**
 * The {@link Image} class represents generic image data
 */
export class Image {
  /**
   * {@link Image} class constructor
   * @param width {@link Image} width in pixels
   * @param height {@link Image} height in pixels
   * @param data Generic {@link Image} data
   * @param channels Amount of {@link Image} channels
   * @param id Image identifier
   * @param bitsPerPixel Number of bits per single pixel
   * @param byteWidth Total number of bytes per image line
   * @param colorMode An images color mode, defaults to {@link ColorMode.BGR}
   * @param pixelDensity Object containing scale info to work with e.g. Retina display data where the reported display size and pixel size differ (Default: {scaleX: 1.0, scaleY: 1.0})
   */
  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly data: Buffer,
    public readonly channels: number,
    public readonly id: string,
    public readonly bitsPerPixel: number,
    public readonly byteWidth: number,
    public readonly colorMode: ColorMode = ColorMode.BGR,
    public readonly pixelDensity: { scaleX: number; scaleY: number } = {
      scaleX: 1.0,
      scaleY: 1.0,
    }
  ) {
    if (channels <= 0) {
      throw new Error("Channel <= 0");
    }
  }

  /**
   * {@link hasAlphaChannel} return true if an {@link Image} has an additional (fourth) alpha channel
   */
  public get hasAlphaChannel() {
    return this.channels > 3;
  }

  /**
   * {@link toRGB} converts an {@link Image} from BGR color mode (default within nut.js) to RGB
   */
  public async toRGB(): Promise<Image> {
    if (this.colorMode === ColorMode.RGB) {
      return this;
    }
    const rgbImage = imageToJimp(this);
    return new Image(
      this.width,
      this.height,
      rgbImage.bitmap.data,
      this.channels,
      this.id,
      this.bitsPerPixel,
      this.byteWidth,
      ColorMode.RGB,
      this.pixelDensity
    );
  }

  /**
   * {@link toBGR} converts an {@link Image} from RGB color mode to RGB
   */
  public async toBGR(): Promise<Image> {
    if (this.colorMode === ColorMode.BGR) {
      return this;
    }
    const rgbImage = imageToJimp(this);
    return new Image(
      this.width,
      this.height,
      rgbImage.bitmap.data,
      this.channels,
      this.id,
      this.bitsPerPixel,
      this.byteWidth,
      ColorMode.BGR,
      this.pixelDensity
    );
  }

  /**
   * {@link fromRGBData} creates an {@link Image} from provided RGB data
   */
  public static fromRGBData(
    width: number,
    height: number,
    data: Buffer,
    channels: number,
    id: string,
    bitsPerPixel: number,
    byteWidth: number
  ): Image {
    const rgbImage = new Image(
      width,
      height,
      data,
      channels,
      id,
      bitsPerPixel,
      byteWidth
    );
    const jimpImage = imageToJimp(rgbImage);
    return new Image(
      width,
      height,
      jimpImage.bitmap.data,
      channels,
      id,
      bitsPerPixel,
      byteWidth
    );
  }
}

const testImage = new Image(
  100,
  100,
  Buffer.from([]),
  4,
  "typeCheck",
  4,
  100 * 4
);
const imageKeys = Object.keys(testImage);

export function isImage(possibleImage: any): possibleImage is Image {
  if (typeof possibleImage !== "object") {
    return false;
  }
  for (const key of imageKeys) {
    if (!(key in possibleImage)) {
      return false;
    }
    const possibleImageKeyType = typeof possibleImage[key];
    const imageKeyType = typeof testImage[key as keyof typeof testImage];
    if (possibleImageKeyType !== imageKeyType) {
      return false;
    }
  }
  return true;
}
