export class Image {
  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly data: any,
    public readonly channels: number,
    public readonly pixelDensity: { scaleX: number; scaleY: number } = {
      scaleX: 1.0,
      scaleY: 1.0,
    },
  ) {
    if (channels <= 0) {
      throw new Error("Channel <= 0");
    }
  }

  public get hasAlphaChannel() {
    return this.channels > 3;
  }
}
