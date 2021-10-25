import {NativeAdapter} from "./adapter/native.adapter.class";
import {ClipboardClass} from "./clipboard.class";
import providerRegistry from "./provider/provider-registry.class";

describe("Clipboard class", () => {
    it("should paste copied input from system clipboard.", async () => {
        const adapterMock = new NativeAdapter(providerRegistry);
        const SUT = new ClipboardClass(adapterMock);

        const textToCopy = "bar";

        SUT.copy(textToCopy);
        await expect(SUT.paste()).resolves.toEqual(textToCopy);
    });
});
