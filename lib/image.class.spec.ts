import { Image } from "./image.class";

describe("Image class", () => {
  it("should return alphachannel = true for > 3 channels", () => {
    const SUT = new Image(200, 200, 123, 4, "id");
    expect(SUT.hasAlphaChannel).toBeTruthy();
  });

  it("should return alphachannel = false for <= 3 channels", () => {
    const SUT = new Image(200, 200, 123, 3, "id");
    expect(SUT.hasAlphaChannel).toBeFalsy();
  });
  it("should return alphachannel = false for <= 3 channels", () => {
    const SUT = new Image(200, 200, 123, 2, "id");
    expect(SUT.hasAlphaChannel).toBeFalsy();
  });
  it("should return alphachannel = false for <= 3 channels", () => {
    const SUT = new Image(200, 200, 123, 1, "id");
    expect(SUT.hasAlphaChannel).toBeFalsy();
  });

  it("should throw for <= 0 channels", () => {
    expect(() => new Image(200, 200, 123, 0, "id")).toThrowError("Channel <= 0");
  });

  it("should have a default pixel density of 1.0", () => {
    const SUT = new Image(200, 200, 123, 1, "id");
    expect(SUT.pixelDensity).toEqual({ scaleX: 1.0, scaleY: 1.0 });
  });
});
