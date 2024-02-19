import { Image, loadImage, Point, Region, RGBA, ScreenClass } from "../index";
import { mockPartial } from "sneer";
import providerRegistry from "./provider/provider-registry.class";
import { ImageProcessor, ProviderRegistry, ScreenProviderInterface } from "@nut-tree/provider-interfaces";
import { NoopLogProvider } from "./provider/log/noop-log-provider.class";

const searchRegion = new Region(0, 0, 1000, 1000);
const providerRegistryMock = mockPartial<ProviderRegistry>({
  getScreen(): ScreenProviderInterface {
    return mockPartial<ScreenProviderInterface>({
      grabScreenRegion(): Promise<Image> {
        return Promise.resolve(
          new Image(
            searchRegion.width,
            searchRegion.height,
            Buffer.from([]),
            3,
            "needle_image",
            4,
            searchRegion.width * 4
          )
        );
      },
      screenSize(): Promise<Region> {
        return Promise.resolve(searchRegion);
      }
    });
  },
  getImageProcessor(): ImageProcessor {
    return providerRegistry.getImageProcessor();
  }
});

describe("colorAt", () => {
  it("should return the correct RGBA value for a given pixel", async () => {
    // GIVEN
    const screenshot = loadImage(`${__dirname}/../assets/checkers.png`);
    const grabScreenMock = jest.fn(() => Promise.resolve(screenshot));
    providerRegistryMock.getScreen = jest.fn(() =>
      mockPartial<ScreenProviderInterface>({
        grabScreen: grabScreenMock
      })
    );
    providerRegistryMock.getLogProvider = () => new NoopLogProvider();
    providerRegistryMock.getImageProcessor();
    const SUT = new ScreenClass(providerRegistryMock);
    const expectedWhite = new RGBA(255, 255, 255, 255);
    const expectedBlack = new RGBA(0, 0, 0, 255);

    // WHEN
    const white = await SUT.colorAt(new Point(64, 64));
    const black = await SUT.colorAt(new Point(192, 64));

    // THEN
    expect(white).toStrictEqual(expectedWhite);
    expect(black).toStrictEqual(expectedBlack);
  });

  it("should account for pixel density when retrieving pixel color", async () => {
    // GIVEN
    const screenshot = await loadImage(
      `${__dirname}/../assets/checkers.png`
    );
    screenshot.pixelDensity.scaleX = 2.0;
    screenshot.pixelDensity.scaleY = 2.0;
    const grabScreenMock = jest.fn(() => Promise.resolve(screenshot));
    providerRegistryMock.getScreen = jest.fn(() =>
      mockPartial<ScreenProviderInterface>({
        grabScreen: grabScreenMock
      })
    );
    providerRegistryMock.getLogProvider = () => new NoopLogProvider();
    providerRegistryMock.getImageProcessor();
    const SUT = new ScreenClass(providerRegistryMock);
    const expectedWhite = new RGBA(255, 255, 255, 255);
    const expectedBlack = new RGBA(0, 0, 0, 255);

    // WHEN
    const white = await SUT.colorAt(new Point(32, 32));
    const black = await SUT.colorAt(new Point(96, 32));

    // THEN
    expect(white).toStrictEqual(expectedWhite);
    expect(black).toStrictEqual(expectedBlack);
  });

  it("should throw on non-Point arguments", async () => {
    // GIVEN
    const grabScreenMock = jest.fn(() =>
      Promise.resolve(new Image(10, 10, Buffer.from([]), 4, "test", 4, 10 * 4))
    );
    providerRegistryMock.getScreen = jest.fn(() =>
      mockPartial<ScreenProviderInterface>({
        grabScreen: grabScreenMock
      })
    );
    const SUT = new ScreenClass(providerRegistryMock);

    // WHEN
    const result = SUT.colorAt({ x: 10 } as Point);

    // THEN
    await expect(result).rejects.toThrowError(
      /^colorAt requires a Point, but received/
    );
  });
});
