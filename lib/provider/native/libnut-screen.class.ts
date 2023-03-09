import libnut = require("@nut-tree/libnut");
import { Image } from "../../image.class";
import { Region } from "../../region.class";
import { ScreenProviderInterface } from "../screen-provider.interface";
import { ColorMode } from "../../colormode.enum";

export default class ScreenAction implements ScreenProviderInterface {
  private static determinePixelDensity(
    screen: Region,
    screenShot: libnut.Bitmap
  ): { scaleX: number; scaleY: number } {
    return {
      scaleX: screenShot.width / screen.width,
      scaleY: screenShot.height / screen.height,
    };
  }

  constructor() {}

  public grabScreen(): Promise<Image> {
    return new Promise((resolve, reject) => {
      const screenShot = libnut.screen.capture();
      if (screenShot) {
        const screenSize = libnut.getScreenSize();
        const pixelScaling = ScreenAction.determinePixelDensity(
          new Region(0, 0, screenSize.width, screenSize.height),
          screenShot
        );
        resolve(
          new Image(
            screenShot.width,
            screenShot.height,
            screenShot.image.slice(0, screenShot.width * screenShot.height * 4),
            4,
            "grabScreenResult",
            screenShot.bitsPerPixel,
            screenShot.byteWidth,
            ColorMode.BGR,
            pixelScaling
          )
        );
      } else {
        reject("Unable to fetch screen content.");
      }
    });
  }

  public grabScreenRegion(region: Region): Promise<Image> {
    return new Promise((resolve, reject) => {
      const screenShot = libnut.screen.capture(
        region.left,
        region.top,
        region.width,
        region.height
      );
      if (screenShot) {
        const pixelScaling = ScreenAction.determinePixelDensity(
          region,
          screenShot
        );
        resolve(
          new Image(
            screenShot.width,
            screenShot.height,
            screenShot.image.slice(0, screenShot.width * screenShot.height * 4),
            4,
            "grabScreenRegionResult",
            screenShot.bitsPerPixel,
            screenShot.byteWidth,
            ColorMode.BGR,
            pixelScaling
          )
        );
      } else {
        reject("Unable to fetch screen content.");
      }
    });
  }

  public highlightScreenRegion(
    region: Region,
    duration: number,
    opacity: number
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      libnut.screen.highlight(
        region.left,
        region.top,
        region.width,
        region.height,
        duration,
        opacity
      );
      resolve();
    });
  }

  public screenWidth(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      try {
        const size = libnut.getScreenSize();
        resolve(size.width);
      } catch (e) {
        reject(e);
      }
    });
  }

  public screenHeight(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      try {
        const size = libnut.getScreenSize();
        resolve(size.height);
      } catch (e) {
        reject(e);
      }
    });
  }

  public screenSize(): Promise<Region> {
    return new Promise<Region>((resolve, reject) => {
      try {
        const screenSize = libnut.getScreenSize();
        resolve(new Region(0, 0, screenSize.width, screenSize.height));
      } catch (e) {
        reject(e);
      }
    });
  }
}
