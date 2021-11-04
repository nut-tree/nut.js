import ImageWriter from "./jimp-image-writer.class";
import ImageReader from "./jimp-image-reader.class";
import {join} from "path";

describe('Jimp image writer', () => {
    it('should reject on writing failures', async () => {
        // GIVEN
        const inputFilename = join(__dirname, '__mocks__', 'calculator.png');
        const outputFile = await (new ImageReader().load(inputFilename));
        const outputFileName = "/does/not/compute.png"
        const SUT = new ImageWriter();

        // WHEN
        const func = () => SUT.store({data: outputFile, path: outputFileName});

        // THEN
        await expect(func).rejects.toThrowError()
    });
});