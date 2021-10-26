import {Image} from "../image.class";
import {MatchRequest} from "../match-request.class";
import ScreenAction from "../provider/native/libnut-screen.class";
import {Region} from "../region.class";
import {VisionAdapter} from "./vision.adapter.class";
import providerRegistry from "../provider/provider-registry.class";
import {MatchResult} from "../match-result.class";

jest.mock("../provider/native/libnut-screen.class");

const finderMock = {
    findMatch: jest.fn(() => Promise.resolve(
        new MatchResult(0,
            new Region(0, 0, 100, 100)
        )
    )),
    findMatches: jest.fn(() => Promise.resolve([]))
}

describe("VisionAdapter class", () => {
    it("should delegate calls to grabScreen", () => {
        // GIVEN
        const screenMock = new ScreenAction();
        providerRegistry.registerImageFinder(finderMock);
        providerRegistry.registerScreenProvider(screenMock);
        const SUT = new VisionAdapter(providerRegistry);

        // WHEN
        SUT.grabScreen();

        // THEN
        expect(screenMock.grabScreen).toBeCalledTimes(1);
    });

    it("should delegate calls to grabScreenRegion", async () => {
        // GIVEN
        const screenMock = new ScreenAction();
        providerRegistry.registerImageFinder(finderMock);
        providerRegistry.registerScreenProvider(screenMock);
        const SUT = new VisionAdapter(providerRegistry);
        const screenRegion = new Region(0, 0, 100, 100);

        // WHEN
        await SUT.grabScreenRegion(screenRegion);

        // THEN
        expect(screenMock.grabScreenRegion).toBeCalledTimes(1);
        expect(screenMock.grabScreenRegion).toBeCalledWith(screenRegion);
    });

    it("should delegate calls to highlightScreenRegion", async () => {
        // GIVEN
        const screenMock = new ScreenAction();
        providerRegistry.registerImageFinder(finderMock);
        providerRegistry.registerScreenProvider(screenMock);
        const SUT = new VisionAdapter(providerRegistry);
        const screenRegion = new Region(0, 0, 100, 100);
        const opacity = 0.25;
        const duration = 1;

        // WHEN
        await SUT.highlightScreenRegion(screenRegion, duration, opacity);

        // THEN
        expect(screenMock.highlightScreenRegion).toBeCalledTimes(1);
        expect(screenMock.highlightScreenRegion).toBeCalledWith(screenRegion, duration, opacity);
    });

    it("should delegate calls to screenWidth", async () => {
        // GIVEN
        const screenMock = new ScreenAction();
        providerRegistry.registerImageFinder(finderMock);
        providerRegistry.registerScreenProvider(screenMock);
        const SUT = new VisionAdapter(providerRegistry);

        // WHEN
        await SUT.screenWidth();

        // THEN
        expect(screenMock.screenWidth).toBeCalledTimes(1);
    });

    it("should delegate calls to screenHeight", async () => {
        // GIVEN
        const screenMock = new ScreenAction();
        providerRegistry.registerImageFinder(finderMock);
        providerRegistry.registerScreenProvider(screenMock);
        const SUT = new VisionAdapter(providerRegistry);

        // WHEN
        await SUT.screenHeight();

        // THEN
        expect(screenMock.screenHeight).toBeCalledTimes(1);
    });

    it("should delegate calls to screenSize", async () => {
        // GIVEN
        const screenMock = new ScreenAction();
        providerRegistry.registerImageFinder(finderMock);
        providerRegistry.registerScreenProvider(screenMock);
        const SUT = new VisionAdapter(providerRegistry);

        // WHEN
        await SUT.screenSize();

        // THEN
        expect(screenMock.screenSize).toBeCalledTimes(1);
    });

    it("should delegate calls to findImage", async () => {
        // GIVEN
        providerRegistry.registerImageFinder(finderMock);
        const SUT = new VisionAdapter(providerRegistry);
        const request = new MatchRequest(
            new Image(100, 100, new ArrayBuffer(0), 3),
            "foo",
            new Region(0, 0, 100, 100),
            0.99,
            true);

        // WHEN
        await SUT.findOnScreenRegion(request);

        expect(finderMock.findMatch).toBeCalledTimes(1);
        expect(finderMock.findMatch).toBeCalledWith(request);
    });
});
