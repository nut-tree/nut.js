import { join } from "path";
import { cwd } from "process";
import { VisionAdapter } from "./adapter/vision.adapter.class";
import { Image } from "./image.class";
import { LocationParameters } from "./locationparameters.class";
import { MatchRequest } from "./match-request.class";
import { MatchResult } from "./match-result.class";
import { Region } from "./region.class";
import { ScreenClass } from "./screen.class";
import { mockPartial } from "sneer";
import { FileType } from "./file-type.enum";
import providerRegistry from "./provider/provider-registry.class";

jest.mock("./adapter/native.adapter.class");
jest.mock("./adapter/vision.adapter.class");

const searchRegion = new Region(0, 0, 1000, 1000);

beforeAll(() => {
    VisionAdapter.prototype.grabScreen = jest.fn(() => {
        return Promise.resolve(new Image(searchRegion.width, searchRegion.height, new ArrayBuffer(0), 3));
    });

    VisionAdapter.prototype.screenSize = jest.fn(() => {
        return Promise.resolve(searchRegion);
    });
});

describe("Screen.", () => {

    describe("find", () => {
        it("should resolve with sufficient confidence.", async () => {

            // GIVEN
            const matchResult = new MatchResult(0.99, searchRegion);
            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new VisionAdapter(providerRegistry);
            const SUT = new ScreenClass(visionAdapterMock);
            const imagePath = "test/path/to/image.png";


            // WHEN
            const resultRegion = SUT.find(imagePath);

            // THEN
            await expect(resultRegion).resolves.toEqual(matchResult.location);
            const matchRequest = new MatchRequest(
                expect.any(Image),
                join(cwd(), imagePath),
                searchRegion,
                SUT.config.confidence,
                true);
            expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(matchRequest);
        });

        it("should call registered hook before resolve", async () => {

            // GIVEN
            const matchResult = new MatchResult(0.99, searchRegion);
            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new VisionAdapter(providerRegistry);

            const SUT = new ScreenClass(visionAdapterMock);
            const testCallback = jest.fn(() => Promise.resolve());
            const imagePath = "test/path/to/image.png";
            SUT.on(imagePath, testCallback);

            // WHEN
            await SUT.find(imagePath);

            // THEN
            expect(testCallback).toBeCalledTimes(1);
            expect(testCallback).toBeCalledWith(matchResult);
        });

        it("should call multiple registered hooks before resolve", async () => {

            // GIVEN
            const matchResult = new MatchResult(0.99, searchRegion);
            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new VisionAdapter(providerRegistry);

            const SUT = new ScreenClass(visionAdapterMock);
            const testCallback = jest.fn(() => Promise.resolve());
            const secondCallback = jest.fn(() => Promise.resolve());
            const imagePath = "test/path/to/image.png";
            SUT.on(imagePath, testCallback);
            SUT.on(imagePath, secondCallback);

            // WHEN
            await SUT.find(imagePath);

            // THEN
            for (const callback of [testCallback, secondCallback]) {
                expect(callback).toBeCalledTimes(1);
                expect(callback).toBeCalledWith(matchResult);
            }
        });

        it("should reject with insufficient confidence.", async () => {

            // GIVEN
            const matchResult = new MatchResult(0.8, searchRegion);

            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });

            const visionAdapterMock = new VisionAdapter(providerRegistry);

            const SUT = new ScreenClass(visionAdapterMock);
            const imagePath = "test/path/to/image.png";

            // WHEN
            const resultRegion = SUT.find(imagePath);

            // THEN
            await expect(resultRegion)
                .rejects
                .toEqual(`No match for ${imagePath}. Required: ${SUT.config.confidence}, given: ${matchResult.confidence}`);
        });

        it("should reject when search fails.", async () => {

            // GIVEN
            const rejectionReason = "Search failed.";
            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.reject(rejectionReason);
            });

            const visionAdapterMock = new VisionAdapter(providerRegistry);

            const SUT = new ScreenClass(visionAdapterMock);
            const imagePath = "test/path/to/image.png";

            // WHEN
            const resultRegion = SUT.find(imagePath);

            // THEN
            await expect(resultRegion)
                .rejects
                .toEqual(`Searching for ${imagePath} failed. Reason: '${rejectionReason}'`);


        });

        it("should override default confidence value with parameter.", async () => {

            // GIVEN
            const minMatch = 0.8;
            const matchResult = new MatchResult(minMatch, searchRegion);

            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });

            const visionAdapterMock = new VisionAdapter(providerRegistry);

            const SUT = new ScreenClass(visionAdapterMock);

            const imagePath = "test/path/to/image.png";
            const parameters = new LocationParameters(undefined, minMatch);

            // WHEN
            const resultRegion = SUT.find(imagePath, parameters);

            // THEN
            await expect(resultRegion).resolves.toEqual(matchResult.location);
            const matchRequest = new MatchRequest(
                expect.any(Image),
                join(cwd(), imagePath),
                searchRegion,
                minMatch,
                true);
            expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(matchRequest);
        });

        it("should override default search region with parameter.", async () => {
            // GIVEN
            const customSearchRegion = new Region(10, 10, 90, 90);
            const matchResult = new MatchResult(0.99, searchRegion);
            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new VisionAdapter(providerRegistry);
            const SUT = new ScreenClass(visionAdapterMock);
            const imagePath = "test/path/to/image.png";
            const parameters = new LocationParameters(customSearchRegion);
            const expectedMatchRequest = new MatchRequest(
                expect.any(Image),
                join(cwd(), imagePath),
                customSearchRegion,
                SUT.config.confidence,
                true);

            // WHEN
            await SUT.find(imagePath, parameters);

            // THEN
            expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(expectedMatchRequest);
        });

        it("should override searchMultipleScales with parameter.", async () => {
            // GIVEN
            const matchResult = new MatchResult(0.99, searchRegion);
            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new VisionAdapter(providerRegistry);
            const SUT = new ScreenClass(visionAdapterMock);
            const imagePath = "test/path/to/image.png";
            const parameters = new LocationParameters(searchRegion, undefined, false);
            const expectedMatchRequest = new MatchRequest(
                expect.any(Image),
                join(cwd(), imagePath),
                searchRegion,
                SUT.config.confidence,
                false);

            // WHEN
            await SUT.find(imagePath, parameters);

            // THEN
            expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(expectedMatchRequest);
        });

        it("should override both confidence and search region with parameter.", async () => {
            // GIVEN
            const minMatch = 0.8;
            const customSearchRegion = new Region(10, 10, 90, 90);
            const matchResult = new MatchResult(minMatch, searchRegion);
            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new VisionAdapter(providerRegistry);
            const SUT = new ScreenClass(visionAdapterMock);
            const imagePath = "test/path/to/image.png";
            const parameters = new LocationParameters(customSearchRegion, minMatch);
            const expectedMatchRequest = new MatchRequest(
                expect.any(Image),
                join(cwd(), imagePath),
                customSearchRegion,
                minMatch,
                true);

            // WHEN
            await SUT.find(imagePath, parameters);

            // THEN
            expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(expectedMatchRequest);
        });

        it("should add search region offset to result image location", async () => {

            // GIVEN
            const limitedSearchRegion = new Region(100, 200, 300, 400);
            const resultRegion = new Region(50, 100, 150, 200);
            const matchResult = new MatchResult(0.99, resultRegion);

            const expectedMatchRegion = new Region(
                limitedSearchRegion.left + resultRegion.left,
                limitedSearchRegion.top + resultRegion.top,
                resultRegion.width,
                resultRegion.height);

            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const SUT = new ScreenClass(new VisionAdapter(providerRegistry));

            // WHEN
            const matchRegion = await SUT.find(
                "test/path/to/image.png",
                {
                    searchRegion: limitedSearchRegion
                });

            // THEN
            expect(matchRegion).toEqual(expectedMatchRegion);
        })

        it.each([
            ["with negative x coordinate", new Region(-1, 0, 100, 100)],
            ["with negative y coordinate", new Region(0, -1, 100, 100)],
            ["with negative width", new Region(0, 0, -100, 100)],
            ["with negative height", new Region(0, 0, 100, -100)],
            ["with region outside screen on x axis", new Region(1100, 0, 100, 100)],
            ["with region outside screen on y axis", new Region(0, 1100, 100, 100)],
            ["with region bigger than screen on x axis", new Region(0, 0, 1100, 100)],
            ["with region bigger than screen on y axis", new Region(0, 0, 1000, 1100)],
            ["with region of 1 px width", new Region(0, 0, 1, 1100)],
            ["with region of 1 px height", new Region(0, 0, 100, 1)],
            ["with region leaving screen on x axis", new Region(600, 0, 500, 100)],
            ["with region leaving screen on y axis", new Region(0, 500, 100, 600)],
            ["with NaN x coordinate", new Region("a" as unknown as number, 0, 100, 100)],
            ["with NaN y coordinate", new Region(0, "a" as unknown as number, 100, 600)],
            ["with NaN on width", new Region(0, 0, "a" as unknown as number, 100)],
            ["with NaN on height", new Region(0, 0, 100, "a" as unknown as number)],
        ])("should reject search regions %s", async (_, region) =>{

            // GIVEN
            const imagePath = "test/path/to/image.png"
            const visionAdapterMock = new VisionAdapter(providerRegistry);

            const SUT = new ScreenClass(visionAdapterMock);

            const matchResult = new MatchResult(0.99, region);
            VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });

            // WHEN
            const findPromise = SUT.find(
                imagePath,
                {
                    searchRegion: region
                });

            // THEN
            await expect(findPromise).rejects.toContain(`Searching for ${imagePath} failed. Reason:`);
        })
    });


    it("should return region to highlight for chaining", async () => {
        // GIVEN
        const highlightRegion = new Region(10, 20, 30, 40);
        VisionAdapter.prototype.highlightScreenRegion = jest.fn();
        const visionAdapterMock = new VisionAdapter(providerRegistry);
        const SUT = new ScreenClass(visionAdapterMock);

        // WHEN
        const result = await SUT.highlight(highlightRegion);

        // THEN
        expect(result).toEqual(highlightRegion);
    });

    it("should handle Promises and return region to highlight for chaining", async () => {
        // GIVEN
        const highlightRegion = new Region(10, 20, 30, 40);
        const highlightRegionPromise = new Promise<Region>(res => res(highlightRegion));
        VisionAdapter.prototype.highlightScreenRegion = jest.fn();
        const visionAdapterMock = new VisionAdapter(providerRegistry);
        const SUT = new ScreenClass(visionAdapterMock);

        // WHEN
        const result = await SUT.highlight(highlightRegionPromise);

        // THEN
        expect(result).toEqual(highlightRegion);
    });

    describe("capture",() => {
        it("should capture the whole screen and save image", async() => {

            // GIVEN
            const screenshot = mockPartial<Image>({data: "pretty pretty image"});
            VisionAdapter.prototype.grabScreen = jest.fn(() => Promise.resolve(screenshot));
            VisionAdapter.prototype.saveImage = jest.fn();
            const visionAdapterMock = new VisionAdapter(providerRegistry);
            const SUT = new ScreenClass(visionAdapterMock);
            const imageName = "foobar.png"
            const expectedImagePath = join(cwd(), imageName)

            // WHEN
            const imagePath = await SUT.capture(imageName)

            // THEN
            expect(imagePath).toBe(expectedImagePath)
            expect(VisionAdapter.prototype.grabScreen).toHaveBeenCalled()
            expect(VisionAdapter.prototype.saveImage).toHaveBeenCalledWith(screenshot,expectedImagePath)
        })

        it("should consider output configuration", async () => {

            // GIVEN
            const visionAdapterMock = new VisionAdapter(providerRegistry);
            const SUT = new ScreenClass(visionAdapterMock);
            const imageName = "foobar"
            const filePath = "/path/to/file"
            const prefix = "answer_"
            const postfix = "_42"
            const expectedImagePath = join(filePath, `${prefix}${imageName}${postfix}${FileType.JPG.toString()}`)

            // WHEN
            const imagePath = await SUT.capture(imageName, FileType.JPG, filePath, prefix, postfix)

            // THEN
            expect(imagePath).toBe(expectedImagePath)
        })
    })

    describe("captureRegion", () => {

        it("should capture the specified region of the screen and save image", async () => {
            // GIVEN
            const screenshot = mockPartial<Image>({data: "pretty partial image"});
            const regionToCapture = mockPartial<Region>({top:42, left:9, height: 10, width: 3.14159265359})
            VisionAdapter.prototype.grabScreenRegion = jest.fn(() => Promise.resolve(screenshot));
            VisionAdapter.prototype.saveImage = jest.fn();
            const visionAdapterMock = new VisionAdapter(providerRegistry);
            const SUT = new ScreenClass(visionAdapterMock);
            const imageName = "foobar.png"
            const expectedImagePath = join(cwd(), imageName)

            // WHEN
            const imagePath = await SUT.captureRegion(imageName, regionToCapture)

            // THEN
            expect(imagePath).toBe(expectedImagePath)
            expect(VisionAdapter.prototype.grabScreenRegion).toHaveBeenCalledWith(regionToCapture)
            expect(VisionAdapter.prototype.saveImage).toHaveBeenCalledWith(screenshot,expectedImagePath)
        })

        it("should consider output configuration", async () => {

            // GIVEN
            const regionToCapture = mockPartial<Region>({top:42, left:9, height: 10, width: 3.14159265359})
            const visionAdapterMock = new VisionAdapter(providerRegistry);
            const SUT = new ScreenClass(visionAdapterMock);
            const imageName = "foobar"
            const filePath = "/path/to/file"
            const prefix = "answer_"
            const postfix = "_42"
            const expectedImagePath = join(filePath, `${prefix}${imageName}${postfix}${FileType.JPG.toString()}`)

            // WHEN
            const imagePath = await SUT.captureRegion(imageName, regionToCapture, FileType.JPG, filePath, prefix, postfix)

            // THEN
            expect(imagePath).toBe(expectedImagePath)
        })
    })
});
