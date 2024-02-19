import { Window } from "./window.class";
import { ProviderRegistry, ScreenProviderInterface, WindowProviderInterface } from "@nut-tree/provider-interfaces";
import { mockPartial } from "sneer";
import { Region } from "@nut-tree/shared";

describe("Window class", () => {
  it("should retrieve the window region via provider", async () => {
    // GIVEN
    const windowMock = jest.fn(() => {
      return Promise.resolve(new Region(10, 10, 100, 100));
    });
    const providerRegistryMock = mockPartial<ProviderRegistry>({
      getWindow(): WindowProviderInterface {
        return mockPartial<WindowProviderInterface>({
          getWindowRegion: windowMock
        });
      },
      getScreen(): ScreenProviderInterface {
        return mockPartial<ScreenProviderInterface>({
          screenSize(): Promise<Region> {
            return Promise.resolve(new Region(0, 0, 1920, 1080));
          }
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
