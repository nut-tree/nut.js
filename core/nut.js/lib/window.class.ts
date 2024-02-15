import { Point, Region, Size, WindowInterface } from "@nut-tree/shared";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";

export class Window implements WindowInterface {
  constructor(
    private providerRegistry: ProviderRegistry,
    private windowHandle: number
  ) {
  }

  get title(): Promise<string> {
    return this.getTitle();
  }

  async getTitle(): Promise<string> {
    return this.providerRegistry.getWindow().getWindowTitle(this.windowHandle);
  }

  get region(): Promise<Region> {
    return this.getRegion();
  }

  async getRegion(): Promise<Region> {
    return this.providerRegistry.getWindow().getWindowRegion(this.windowHandle);
  }

  async move(newOrigin: Point) {
    return this.providerRegistry
      .getWindow()
      .moveWindow(this.windowHandle, newOrigin);
  }

  async resize(newSize: Size) {
    return this.providerRegistry
      .getWindow()
      .resizeWindow(this.windowHandle, newSize);
  }

  async focus() {
    return this.providerRegistry.getWindow().focusWindow(this.windowHandle);
  }
}
