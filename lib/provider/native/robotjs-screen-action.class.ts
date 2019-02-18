import robot = require("robotjs");
import { Image } from "../../image.class";
import { Region } from "../../region.class";
import { ScreenActionProvider } from "./screen-action-provider.interface";

export class ScreenAction implements ScreenActionProvider {
  constructor() {}

  public grabScreen(): Promise<Image> {
    return new Promise((resolve, reject) => {
      const screenShot = robot.screen.capture();
      if (screenShot) {
        const screenSize = robot.getScreenSize();
        const pixelScaling = this.determinePixelDensity(
          new Region(0, 0, screenSize.width, screenSize.height),
          screenShot,
        );
        resolve(
          new Image(
            screenShot.width,
            screenShot.height,
            screenShot.image,
            3,
            pixelScaling,
          ),
        );
      } else {
        reject("Unable to fetch screen content.");
      }
    });
  }

  public grabScreenRegion(region: Region): Promise<Image> {
    return new Promise((resolve, reject) => {
      const screenShot = robot.screen.capture(
        region.left,
        region.top,
        region.width,
        region.height,
      );
      if (screenShot) {
        const pixelScaling = this.determinePixelDensity(region, screenShot);
        resolve(
          new Image(
            screenShot.width,
            screenShot.height,
            screenShot.image,
            3,
            pixelScaling,
          ),
        );
      } else {
        reject("Unable to fetch screen content.");
      }
    });
  }

  public screenWidth(): number {
    return robot.getScreenSize().width;
  }

  public screenHeight(): number {
    return robot.getScreenSize().height;
  }

  public screenSize(): Region {
    const screenSize = robot.getScreenSize();
    return new Region(0, 0, screenSize.width, screenSize.height);
  }

  private determinePixelDensity(
    screen: Region,
    screenShot: robot.Bitmap,
  ): { scaleX: number; scaleY: number } {
    return {
      scaleX: screenShot.width / screen.width,
      scaleY: screenShot.height / screen.height,
    };
  }
}
