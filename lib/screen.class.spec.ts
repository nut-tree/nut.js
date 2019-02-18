import {NativeAdapter} from "./adapter/native.adapter.class";
import {VisionAdapter} from "./adapter/vision.adapter.class";
import {Image} from "./image.class";
import {LocationParameters} from "./locationparameters.class";
import {MatchRequest} from "./match-request.class";
import {MatchResult} from "./match-result.class";
import {Region} from "./region.class";
import {Screen} from "./screen.class";

jest.mock("./adapter/native.adapter.class");
jest.mock("./adapter/vision.adapter.class");

const searchRegion = new Region(0, 0, 100, 100);

beforeAll(() => {
  NativeAdapter.prototype.grabScreen = jest.fn(() => {
    return new Image(searchRegion.width, searchRegion.height, new ArrayBuffer(0), 3);
  });

  NativeAdapter.prototype.screenSize = jest.fn(() => {
    return searchRegion;
  });
});

describe("Screen.", () => {
  it("should resolve with sufficient confidence.", async () => {
    const matchResult = new MatchResult(0.99, searchRegion);

    VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
      return matchResult;
    });

    const visionAdapterMock = new VisionAdapter();
    const nativeAdapterMock = new NativeAdapter();

    const SUT = new Screen(visionAdapterMock, nativeAdapterMock);
    const imagePath = "test/path/to/image.png";
    await expect(SUT.findOnScreen(imagePath)).resolves.toEqual(matchResult.location);
    const matchRequest = new MatchRequest(
        expect.any(Image),
        imagePath,
        searchRegion,
        SUT.config.confidence,
        true);
    expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(matchRequest);
  });

  it("should reject with insufficient confidence.", async () => {
    const matchResult = new MatchResult(0.8, searchRegion);

    VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
      return matchResult;
    });

    const visionAdapterMock = new VisionAdapter();
    const nativeAdapterMock = new NativeAdapter();

    const SUT = new Screen(visionAdapterMock, nativeAdapterMock);
    const imagePath = "test/path/to/image.png";
    await expect(SUT.findOnScreen(imagePath))
        .rejects
        .toEqual(`No match for ${imagePath}. Required: ${SUT.config.confidence}, given: ${matchResult.confidence}`);
  });

  it("should override default confidence value with parameter.", async () => {
    const minMatch = 0.8;
    const matchResult = new MatchResult(minMatch, searchRegion);

    VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
      return matchResult;
    });

    const visionAdapterMock = new VisionAdapter();
    const nativeAdapterMock = new NativeAdapter();

    const SUT = new Screen(visionAdapterMock, nativeAdapterMock);

    const imagePath = "test/path/to/image.png";
    const parameters = new LocationParameters(undefined, minMatch);
    await expect(SUT.findOnScreen(imagePath, parameters)).resolves.toEqual(matchResult.location);
    const matchRequest = new MatchRequest(
        expect.any(Image),
        imagePath,
        searchRegion,
        minMatch,
        true);
    expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(matchRequest);
  });

  it("should override default search region with parameter.", async () => {
    const customSearchRegion = new Region(10, 10, 90, 90);
    const matchResult = new MatchResult(0.99, searchRegion);

    VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
      return matchResult;
    });

    const visionAdapterMock = new VisionAdapter();
    const nativeAdapterMock = new NativeAdapter();

    const SUT = new Screen(visionAdapterMock, nativeAdapterMock);

    const imagePath = "test/path/to/image.png";
    const parameters = new LocationParameters(customSearchRegion);
    await expect(SUT.findOnScreen(imagePath, parameters)).resolves.toEqual(matchResult.location);
    const matchRequest = new MatchRequest(
        expect.any(Image),
        imagePath,
        customSearchRegion,
        SUT.config.confidence,
        true);
    expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(matchRequest);
  });

  it("should override both confidence and search region with parameter.", async () => {
    const minMatch = 0.8;
    const customSearchRegion = new Region(10, 10, 90, 90);
    const matchResult = new MatchResult(minMatch, searchRegion);

    VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
      return matchResult;
    });

    const visionAdapterMock = new VisionAdapter();
    const nativeAdapterMock = new NativeAdapter();

    const SUT = new Screen(visionAdapterMock, nativeAdapterMock);

    const imagePath = "test/path/to/image.png";
    const parameters = new LocationParameters(customSearchRegion, minMatch);
    await expect(SUT.findOnScreen(imagePath, parameters)).resolves.toEqual(matchResult.location);
    const matchRequest = new MatchRequest(
        expect.any(Image),
        imagePath,
        customSearchRegion,
        minMatch,
        true);
    expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(matchRequest);
  });
});
