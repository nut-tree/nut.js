import {NativeAdapter} from "./adapter/native.adapter.class";
import {Clipboard} from "./clipboard.class";

describe("Clipboard class", () => {
    it("should paste copied input from system clipboard.", () => {
        const adapterMock = new NativeAdapter();
        const SUT = new Clipboard(adapterMock);

        const textToCopy = "bar";

        SUT.copy(textToCopy);
        expect(SUT.paste()).toEqual(textToCopy);
    });
});
