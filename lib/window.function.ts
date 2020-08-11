import { WindowApi } from "./window-api.interface";
import { NativeAdapter } from "./adapter/native.adapter.class";
import { Window } from "./window.class";

export const createWindowApi = (nativeAdapter: NativeAdapter): WindowApi => {
  return ({
    async activeWindow(): Promise<Window> {
      const windowHandle = await nativeAdapter.getActiveWindow();
      return new Window(nativeAdapter, windowHandle);
    },
    async windows(): Promise<Window[]> {
      const windowHandles = await nativeAdapter.getWindows();
      return windowHandles.map((handle: number) => {
        return new Window(nativeAdapter, handle);
      });
    },
  });
};