import {existsSync, unlinkSync} from "fs";
import {resolve} from "path";
import ImageReader from "./image-reader.class";
import ImageWriter from "./image-writer.class";

const INPUT_PATH = resolve(__dirname, "./__mocks__/mouse.png");
const OUTPUT_PATH_PNG = resolve(__dirname, "./__mocks__/output.png");
const OUTPUT_PATH_JPG = resolve(__dirname, "./__mocks__/output.jpg");

beforeEach(() => {
    for (const file of [OUTPUT_PATH_JPG, OUTPUT_PATH_PNG]) {
        if (existsSync(file)) {
            unlinkSync(file);
        }
    }
});

describe.each([[OUTPUT_PATH_PNG], [OUTPUT_PATH_JPG]])(
    "Image writer", (outputPath) => {
        test("should allow to store image data to disk", async () => {
            // GIVEN
            const imageReader = new ImageReader();
            const image = await imageReader.load(INPUT_PATH);
            const imageWriter = new ImageWriter();

            // WHEN
            await imageWriter.store({data: image, path: outputPath});

            // THEN
            expect(existsSync(outputPath)).toBeTruthy();
        });
    });
