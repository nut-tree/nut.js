import { ClipboardClass } from "./clipboard.class";
import providerRegistry from "./provider/provider-registry.class";

describe("Clipboard class", () => {
  it("should paste copied input from system clipboard.", async () => {
    const SUT = new ClipboardClass(providerRegistry);

    const textToCopy = "bar";

    SUT.copy(textToCopy);
    await expect(SUT.paste()).resolves.toEqual(textToCopy);
  });
});
