import {NativeAdapter} from "./adapter/native.adapter.class";
import {ClipboardClass} from "./clipboard.class";
import providerRegistry from "./provider/provider-registry.class";

jest.mock('jimp', () => {});
jest.mock("./adapter/native.adapter.class");

beforeEach(() => {
    jest.resetAllMocks();
});

describe("Clipboard class", () => {
    it("should call the native adapters copy method.", () => {
        const adapterMock = new NativeAdapter(providerRegistry);
        const SUT = new ClipboardClass(adapterMock);

        const textToCopy = "bar";

        SUT.copy(textToCopy);
        expect(adapterMock.copy).toHaveBeenCalledTimes(1);
        expect(adapterMock.copy).toHaveBeenCalledWith(textToCopy);
    });

    it("should call the native adapters paste method.", () => {
        const adapterMock = new NativeAdapter(providerRegistry);
        const SUT = new ClipboardClass(adapterMock);

        SUT.paste();
        expect(adapterMock.paste).toHaveBeenCalledTimes(1);
    });
});
