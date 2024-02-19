import { WindowApi } from "./window-api.interface";
import { Window } from "./window.class";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";

export const createWindowApi = (
  providerRegistry: ProviderRegistry
): WindowApi => {
  return {
    async getActiveWindow(): Promise<Window> {
      const windowHandle = await providerRegistry.getWindow().getActiveWindow();
      providerRegistry
        .getLogProvider()
        .info("Active window handle", { windowHandle });
      return new Window(providerRegistry, windowHandle);
    },
    async getWindows(): Promise<Window[]> {
      const windowHandles = await providerRegistry.getWindow().getWindows();
      providerRegistry
        .getLogProvider()
        .info(`Retrieved ${windowHandles.length} window handles`);
      return windowHandles.map((handle: number) => {
        return new Window(providerRegistry, handle);
      });
    },
  };
};
