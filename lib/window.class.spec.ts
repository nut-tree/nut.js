import {Window} from "./window.class";
import {NativeAdapter} from "./adapter/native.adapter.class";
import providerRegistry from "./provider/provider-registry.class";

jest.mock("./adapter/native.adapter.class");

describe("Window class", () => {
    it("should retrieve the window region via its native adapter", async () => {
        // GIVEN
        const nativeAdapterMock = new NativeAdapter(providerRegistry);
        const mockWindowHandle = 123;
        const SUT = new Window(nativeAdapterMock, mockWindowHandle);

        // WHEN
        await SUT.region

        // THEN
        expect(nativeAdapterMock.getWindowRegion).toBeCalledTimes(1);
        expect(nativeAdapterMock.getWindowRegion).toBeCalledWith(mockWindowHandle);
    });

    it("should retrieve the window title via its native adapter", async () => {
        // GIVEN
        const nativeAdapterMock = new NativeAdapter(providerRegistry);
        const mockWindowHandle = 123;
        const SUT = new Window(nativeAdapterMock, mockWindowHandle);

        // WHEN
        await SUT.title

        // THEN
        expect(nativeAdapterMock.getWindowTitle).toBeCalledTimes(1);
        expect(nativeAdapterMock.getWindowTitle).toBeCalledWith(mockWindowHandle);
    });
});