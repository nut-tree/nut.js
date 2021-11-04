import ImageReader from "./jimp-image-reader.class";
import {join} from "path";
import {Image} from "../../image.class";

describe('Jimp image reader', () => {
    it('should return an Image object', async () => {
        // GIVEN
        const inputPath = join(__dirname, "__mocks__", "calculator.png");
        const expectedData = {
            width: 34,
            height: 28,
            data: expect.any(Buffer),
            channels: 3,
            pixelDensity: {
                scaleX: 1,
                scaleY: 1
            }
        }
        const SUT = new ImageReader();

        // WHEN
        const result = await SUT.load(inputPath);

        // THEN
        expect(result).toBeInstanceOf(Image);
        expect(result.width).toBe(expectedData.width);
        expect(result.height).toBe(expectedData.height);
        expect(result.data).toStrictEqual(expectedData.data);
        expect(result.channels).toBe(expectedData.channels);
        expect(result.pixelDensity).toStrictEqual(expectedData.pixelDensity);
    });

    it('should reject on loading failures', async () => {
        // GIVEN
        const inputPath = "/fails/to/load";
        const expectedError = `Failed to load image from '${inputPath}'. Reason: Error: ENOENT: no such file or directory, open '${inputPath}'`;
        const SUT = new ImageReader();

        // WHEN
        try {
            await SUT.load(inputPath);
        } catch (err) {
            // THEN
            expect(err).toBe(expectedError);
        }
    });
});