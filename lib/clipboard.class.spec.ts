import {NativeAdapter} from "./adapter/native.adapter.class";
import {Clipboard} from "./clipboard.class";

jest.mock("./adapter/native.adapter.class");

beforeEach(() => {
    jest.resetAllMocks();
});

describe("Clipboard class", () => {
    it("should call the native adapters copy method.", () => {
        const adapterMock = new NativeAdapter();
        const SUT = new Clipboard(adapterMock);

        const textToCopy = "bar";

        SUT.copy(textToCopy);
        expect(adapterMock.copy).toHaveBeenCalledTimes(1);
        expect(adapterMock.copy).toHaveBeenCalledWith(textToCopy);
    });

    it("should call the native adapters paste method.", () => {
        const adapterMock = new NativeAdapter();
        const SUT = new Clipboard(adapterMock);

        SUT.paste();
        expect(adapterMock.paste).toHaveBeenCalledTimes(1);
    });
});
