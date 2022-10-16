import { WindowApi } from "./window-api.interface";
import { Window } from "./window.class";
import { ProviderRegistry } from "./provider/provider-registry.class";

export const createWindowApi = (
  providerRegistry: ProviderRegistry
): WindowApi => {
  return {
    async getActiveWindow(): Promise<Window> {
      const windowHandle = await providerRegistry.getWindow().getActiveWindow();
      return new Window(providerRegistry, windowHandle);
    },
    async getWindows(): Promise<Window[]> {
      const windowHandles = await providerRegistry.getWindow().getWindows();
      return windowHandles.map((handle: number) => {
        return new Window(providerRegistry, handle);
      });
    },
  };
};
