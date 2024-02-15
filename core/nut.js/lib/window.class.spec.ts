import { Window } from "./window.class";
import { ProviderRegistry, WindowProviderInterface } from "@nut-tree/provider-interfaces";
import { mockPartial } from "sneer";

describe("Window class", () => {
  it("should retrieve the window region via provider", async () => {
    // GIVEN
    const windowMock = jest.fn();
    const providerRegistryMock = mockPartial<ProviderRegistry>({
      getWindow(): WindowProviderInterface {
        return mockPartial<WindowProviderInterface>({
          getWindowRegion: windowMock
        });
      }
    });
    const mockWindowHandle = 123;
    const SUT = new Window(providerRegistryMock, mockWindowHandle);

    // WHEN
    await SUT.getRegion();

    // THEN
    expect(windowMock).toHaveBeenCalledTimes(1);
    expect(windowMock).toHaveBeenCalledWith(mockWindowHandle);
  });

  it("should retrieve the window title via provider", async () => {
    // GIVEN
    const windowMock = jest.fn();
    const providerRegistryMock = mockPartial<ProviderRegistry>({
      getWindow(): WindowProviderInterface {
        return mockPartial<WindowProviderInterface>({
          getWindowTitle: windowMock
        });
      }
    });
    const mockWindowHandle = 123;
    const SUT = new Window(providerRegistryMock, mockWindowHandle);

    // WHEN
    await SUT.getTitle();

    // THEN
    expect(windowMock).toHaveBeenCalledTimes(1);
    expect(windowMock).toHaveBeenCalledWith(mockWindowHandle);
  });
});
