import * as path from "path";
import ImageReader from "./image-reader.class";
import {scaleImage} from "./scale-image.function";
import {fromImageWithoutAlphaChannel} from "./image-processor.class";

describe("scaleImage", () => {
    it.each([[0.5], [1.5]])("should scale an image correctly by factor %f", async (scaleFactor) => {
        // GIVEN
        const imageLoader = new ImageReader();
        const pathToinput = path.resolve(__dirname, "./__mocks__/mouse.png");
        const inputImage = await imageLoader.load(pathToinput);
        const inputMat = await fromImageWithoutAlphaChannel(inputImage);
        const expectedWidth = Math.floor(inputMat.cols * scaleFactor);
        const expectedHeight = Math.floor(inputMat.rows * scaleFactor);

        // WHEN
        const result = await scaleImage(inputMat, scaleFactor);

        // THEN
        expect(result.rows).toBe(expectedHeight);
        expect(result.cols).toBe(expectedWidth);
    });

    it.each([[0], [-0.25]])("should keep scale if factor <= 0: Scale %f", async (scaleFactor) => {
        // GIVEN
        const imageLoader = new ImageReader();
        const pathToinput = path.resolve(__dirname, "./__mocks__/mouse.png");
        const inputImage = await imageLoader.load(pathToinput);
        const inputMat = await fromImageWithoutAlphaChannel(inputImage);
        const expectedWidth = inputMat.cols;
        const expectedHeight = inputMat.rows;

        // WHEN
        const result = await scaleImage(inputMat, scaleFactor);

        // THEN
        expect(result.rows).toBe(expectedHeight);
        expect(result.cols).toBe(expectedWidth);
    });
});
