import robot = require("robot-js");
import { Image } from "../../image.class";
import { Region } from "../../region.class";
import { ScreenActionProvider } from "./ScreenActionProvider.interface";

export class RobotScreenAction implements ScreenActionProvider {
  constructor() {
    robot.Screen.synchronize();
  }

  public grabScreen(): Promise<Image> {
    return new Promise((resolve, reject) => {
      if (robot.Screen.synchronize()) {
        const img = new robot.Image();
        const mainScreen = robot.Screen.getMain();
        robot.Screen.grabScreen(img, mainScreen.getBounds());
        resolve(new Image(img.getWidth(), img.getHeight(), img.getData()));
      }
      reject("Unable to fetch screen content.");
    });
  }

  public grabScreenRegion(region: Region): Promise<Image> {
    return new Promise((resolve, reject) => {
      if (robot.Screen.synchronize()) {
        const bounds = new robot.Bounds(
          region.left,
          region.top,
          region.width,
          region.height
        );
        if (bounds !== undefined) {
          const img = new robot.Image();
          robot.Screen.grabScreen(img, bounds);
          resolve(new Image(img.getWidth(), img.getHeight(), img.getData()));
        }
        resolve(this.grabScreen());
      }
      reject("Unable to fetch screen content.");
    });
  }

  public screenWidth(): number {
    const mainScreenBounds = robot.Screen.getMain().getBounds();
    return mainScreenBounds.getRight() - mainScreenBounds.getLeft();
  }

  public screenHeight(): number {
    const mainScreenBounds = robot.Screen.getMain().getBounds();
    return mainScreenBounds.getBottom() - mainScreenBounds.getTop();
  }

  public screenSize(): Region {
    const mainScreenBounds = robot.Screen.getMain().getBounds();
    return new Region(
      0,
      0,
      mainScreenBounds.getRight(),
      mainScreenBounds.getBottom()
    );
  }
}
