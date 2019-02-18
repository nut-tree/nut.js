import {NativeAdapter} from "./adapter/native.adapter.class";
import {Key} from "./key.enum";
import {Keyboard} from "./keyboard.class";

jest.mock("./adapter/native.adapter.class");

beforeEach(() => {
    jest.resetAllMocks();
});

describe("Keyboard", () => {
    it("should pass input strings down to the type call.", () => {
        const adapterMock = new NativeAdapter();
        const SUT = new Keyboard(adapterMock);

        const payload = "Test input!";

        SUT.type(payload);
        expect(adapterMock.type).toHaveBeenCalledTimes(1);
        expect(adapterMock.type).toHaveBeenCalledWith(payload);
    });

    it("should pass input keys down to the click call.", () => {
        const adapterMock = new NativeAdapter();
        const SUT = new Keyboard(adapterMock);

        const payload = Key.A;

        SUT.type(payload);
        expect(adapterMock.click).toHaveBeenCalledTimes(1);
        expect(adapterMock.click).toHaveBeenCalledWith(payload);
    });

    it("should pass a list of input keys down to the click call.", () => {
        const adapterMock = new NativeAdapter();
        const SUT = new Keyboard(adapterMock);

        const payload = [Key.A, Key.S, Key.D, Key.F];

        for (const key of payload) {
            SUT.type(key);
        }
        expect(adapterMock.click).toHaveBeenCalledTimes(payload.length);
    });

    it("should pass a list of input keys down to the pressKey call.", () => {
        const adapterMock = new NativeAdapter();
        const SUT = new Keyboard(adapterMock);

        const payload = [Key.A, Key.S, Key.D, Key.F];

        for (const key of payload) {
            SUT.pressKey(key);
        }
        expect(adapterMock.pressKey).toHaveBeenCalledTimes(payload.length);
    });

    it("should pass a list of input keys down to the releaseKey call.", () => {
        const adapterMock = new NativeAdapter();
        const SUT = new Keyboard(adapterMock);

        const payload = [Key.A, Key.S, Key.D, Key.F];

        for (const key of payload) {
            SUT.releaseKey(key);
        }
        expect(adapterMock.releaseKey).toHaveBeenCalledTimes(payload.length);
    });
});
