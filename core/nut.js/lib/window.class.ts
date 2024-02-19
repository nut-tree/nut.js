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
    const region = await this.providerRegistry.getWindow().getWindowRegion(this.windowHandle);
    const mainWindowRegion = await this.providerRegistry.getScreen().screenSize();
    if (region.left < 0) {
      region.width = region.width + region.left;
      region.left = 0;
    }
    if (region.top < 0) {
      region.height = region.height + region.top;
      region.top = 0;
    }
    const rightWindowBound = region.left + region.width;
    if (rightWindowBound > mainWindowRegion.width) {
      const excessWidth = rightWindowBound - mainWindowRegion.width;
      region.width = region.width - excessWidth;
    }
    const bottomWindowBound = region.top + region.height;
    if (bottomWindowBound > mainWindowRegion.height) {
      const excessHeight = bottomWindowBound - mainWindowRegion.height;
      region.height = region.height - excessHeight;
    }
    if (region.width < 0) {
      region.width = 0;
    }
    if (region.height < 0) {
      region.height = 0;
    }
    return region;
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
