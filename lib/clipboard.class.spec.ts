import { ClipboardClass } from "./clipboard.class";
import { ProviderRegistry } from "./provider/provider-registry.class";
import { mockPartial } from "sneer";
import { ClipboardProviderInterface } from "./provider";

jest.mock("jimp", () => {});

beforeEach(() => {
  jest.clearAllMocks();
});

const providerRegistryMock = mockPartial<ProviderRegistry>({});

describe("Clipboard class", () => {
  it("should call providers copy method.", () => {
    // GIVEN
    const SUT = new ClipboardClass(providerRegistryMock);
    const copyMock = jest.fn();
    providerRegistryMock.getClipboard = jest.fn(() =>
      mockPartial<ClipboardProviderInterface>({
        copy: copyMock,
      })
    );
    const textToCopy = "bar";

    // WHEN
    SUT.copy(textToCopy);

    // THEN
    expect(copyMock).toHaveBeenCalledTimes(1);
    expect(copyMock).toHaveBeenCalledWith(textToCopy);
  });

  it("should call providers paste method.", () => {
    // GIVEN
    const SUT = new ClipboardClass(providerRegistryMock);
    const pasteMock = jest.fn();
    providerRegistryMock.getClipboard = jest.fn(() =>
      mockPartial<ClipboardProviderInterface>({
        paste: pasteMock,
      })
    );

    // WHEN
    SUT.paste();

    // THEN
    expect(pasteMock).toHaveBeenCalledTimes(1);
  });
});
