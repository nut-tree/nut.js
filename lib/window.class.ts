import { NativeAdapter } from "./adapter/native.adapter.class";
import { Region } from "./region.class";

export class Window {
  constructor(private nativeActions: NativeAdapter, private windowHandle: number) {
  }

  get title(): Promise<string> {
    return this.nativeActions.getWindowTitle(this.windowHandle);
  }

  get region(): Promise<Region> {
    return this.nativeActions.getWindowRegion(this.windowHandle);
  }
}