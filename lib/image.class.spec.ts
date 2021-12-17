import {Image} from "./image.class";
import {imageToJimp} from "./provider/io/imageToJimp.function";
import {ColorMode} from "./colormode.enum";

jest.mock("./provider/io/imageToJimp.function", () => {
    return {
        imageToJimp: jest.fn()
    }
});

afterEach(() => {
    jest.resetAllMocks();
});

describe("Image class", () => {
    it("should return alphachannel = true for > 3 channels", () => {
        const SUT = new Image(200, 200, Buffer.from([123]), 4, "id");
        expect(SUT.hasAlphaChannel).toBeTruthy();
    });

    it("should return alphachannel = false for <= 3 channels", () => {
        const SUT = new Image(200, 200, Buffer.from([123]), 3, "id");
        expect(SUT.hasAlphaChannel).toBeFalsy();
    });
    it("should return alphachannel = false for <= 3 channels", () => {
        const SUT = new Image(200, 200, Buffer.from([123]), 2, "id");
        expect(SUT.hasAlphaChannel).toBeFalsy();
    });
    it("should return alphachannel = false for <= 3 channels", () => {
        const SUT = new Image(200, 200, Buffer.from([123]), 1, "id");
        expect(SUT.hasAlphaChannel).toBeFalsy();
    });

    it("should throw for <= 0 channels", () => {
        expect(() => new Image(200, 200, Buffer.from([123]), 0, "id")).toThrowError("Channel <= 0");
    });

    it("should have a default pixel density of 1.0", () => {
        const SUT = new Image(200, 200, Buffer.from([123]), 1, "id");
        expect(SUT.pixelDensity).toEqual({scaleX: 1.0, scaleY: 1.0});
    });

    describe("Colormode", () => {
        it("should not try to convert an image to BGR if it already has the correct color mode", async () => {
            // GIVEN
            const bgrImage = new Image(100, 100, Buffer.from([]), 3, "testImage");

            // WHEN
            const convertedImage = await bgrImage.toBGR();

            // THEN
            expect(convertedImage).toBe(bgrImage);
            expect(imageToJimp).not.toBeCalledTimes(1)
        });

        it("should not try to convert an image to RGB if it already has the correct color mode", async () => {
            // GIVEN
            const rgbImage = new Image(100, 100, Buffer.from([]), 3, "testImage", ColorMode.RGB);

            // WHEN
            const convertedImage = await rgbImage.toRGB();

            // THEN
            expect(convertedImage).toBe(rgbImage);
            expect(imageToJimp).not.toBeCalledTimes(1)
        });
    });
});
