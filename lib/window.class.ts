import { Region } from "./region.class";
import { ProviderRegistry } from "./provider/provider-registry.class";

export class Window {
  constructor(
    private providerRegistry: ProviderRegistry,
    private windowHandle: number
  ) {}

  get title(): Promise<string> {
    return this.providerRegistry.getWindow().getWindowTitle(this.windowHandle);
  }

  get region(): Promise<Region> {
    return this.providerRegistry.getWindow().getWindowRegion(this.windowHandle);
  }
}
