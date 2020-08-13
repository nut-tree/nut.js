import libnut = require("@nut-tree/libnut");
import { Region } from "../../region.class";
import { WindowActionProvider } from "./window-action-provider.interface";

export class WindowAction implements WindowActionProvider {
  public getWindows(): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      try {
        resolve(libnut.getWindows());
      } catch (e) {
        reject(e);
      }
    });
  }

  getActiveWindow(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      try {
        resolve(libnut.getActiveWindow());
      } catch (e) {
        reject(e);
      }
    });
  }

  getWindowRegion(windowHandle: number): Promise<Region> {
    return new Promise<Region>((resolve, reject) => {
      try {
        const windowRect = libnut.getWindowRect(windowHandle);
        resolve(new Region(windowRect.x, windowRect.y, windowRect.width, windowRect.height));
      } catch (e) {
        reject(e);
      }
    });
  }

  getWindowTitle(windowHandle: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        resolve(libnut.getWindowTitle(windowHandle));
      } catch (e) {
        reject(e);
      }
    });
  }
}
