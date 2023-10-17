import { Region } from "./region.class";
import { ProviderRegistry } from "./provider/provider-registry.class";
import { Point } from "./point.class";
import { Size } from "./size.class";

export class Window {
  constructor(
    private providerRegistry: ProviderRegistry,
    private windowHandle: number,
  ) {}

  get title(): Promise<string> {
    return this.providerRegistry.getWindow().getWindowTitle(this.windowHandle);
  }

  get region(): Promise<Region> {
    return this.providerRegistry.getWindow().getWindowRegion(this.windowHandle);
  }

  async move(newOrigin: Point) {
    await this.providerRegistry
      .getWindow()
      .moveWindow(this.windowHandle, newOrigin);
  }

  async resize(newSize: Size) {
    await this.providerRegistry
      .getWindow()
      .resizeWindow(this.windowHandle, newSize);
  }

  async focus() {
    await this.providerRegistry.getWindow().focusWindow(this.windowHandle);
  }
}
