import { Window } from "./window.class";
import { ProviderRegistry } from "./provider/provider-registry.class";
import { mockPartial } from "sneer";
import { WindowProviderInterface } from "./provider";

jest.mock("jimp", () => {});

describe("Window class", () => {
  it("should retrieve the window region via provider", async () => {
    // GIVEN
    const windowMock = jest.fn();
    const providerRegistryMock = mockPartial<ProviderRegistry>({
      getWindow(): WindowProviderInterface {
        return mockPartial<WindowProviderInterface>({
          getWindowRegion: windowMock,
        });
      },
    });
    const mockWindowHandle = 123;
    const SUT = new Window(providerRegistryMock, mockWindowHandle);

    // WHEN
    await SUT.region;

    // THEN
    expect(windowMock).toBeCalledTimes(1);
    expect(windowMock).toBeCalledWith(mockWindowHandle);
  });

  it("should retrieve the window title via provider", async () => {
    // GIVEN
    const windowMock = jest.fn();
    const providerRegistryMock = mockPartial<ProviderRegistry>({
      getWindow(): WindowProviderInterface {
        return mockPartial<WindowProviderInterface>({
          getWindowTitle: windowMock,
        });
      },
    });
    const mockWindowHandle = 123;
    const SUT = new Window(providerRegistryMock, mockWindowHandle);

    // WHEN
    await SUT.title;

    // THEN
    expect(windowMock).toBeCalledTimes(1);
    expect(windowMock).toBeCalledWith(mockWindowHandle);
  });
});
