import {Region} from "../../region.class";
import {NativeProviderInterface} from "./native.provider.interface";
import robot = require("robot-js");
import {Point} from "../../point.class";
import {Image} from "../../image.class";

export class RobotJsNativeProvider implements NativeProviderInterface {

    private mouse: any;

    constructor() {
        this.mouse = robot.Mouse();
        robot.Screen.synchronize();
    }

    grabScreen(): Promise<Image> {
        return new Promise(((resolve, reject) => {
            if (robot.Screen.synchronize()) {
                const _img = new robot.Image();
                const _main = robot.Screen.getMain();
                robot.Screen.grabScreen(_img, _main.getBounds());
                resolve(new Image(
                    _img.getWidth(),
                    _img.getHeight(),
                    _img.getData()
                ));
            }
            reject("Unable to fetch screen content.");
        }));
    }

    grabScreenRegion(region: Region): Promise<Image> {
        return new Promise(((resolve, reject) => {
            if (robot.Screen.synchronize()) {
                const bounds = new robot.Bounds(
                    region.left,
                    region.top,
                    region.width,
                    region.height
                );
                if (bounds !== undefined) {
                    const _img = new robot.Image();
                    robot.Screen.grabScreen(_img, bounds);
                    resolve(new Image(
                        _img.getWidth(),
                        _img.getHeight(),
                        Buffer.from(
                            _img.getData()
                        )
                    ));
                }
                resolve(this.grabScreen());
            }
            reject("Unable to fetch screen content.");
        }));
    }

    setMouseDelay(delay: number): void {
        this.mouse.autoDelay.min = delay;
        this.mouse.autoDelay.max = delay;
    }

    setMousePosition(p: Point): void {
        robot.Mouse.setPos(p.x, p.y);
    }

    currentMousePosition(): Point {
        const robotPoint = robot.Mouse.getPos();
        return new Point(robotPoint.x, robotPoint.y);
    }

    screenWidth(): number {
        const mainScreenBounds = robot.Screen.getMain().getBounds();
        return mainScreenBounds.getRight() - mainScreenBounds.getLeft();
    }

    screenHeight(): number {
        const mainScreenBounds = robot.Screen.getMain().getBounds();
        return mainScreenBounds.getBottom() - mainScreenBounds.getTop();
    }

    screenSize(): Region {
        console.log(robot.Screen.getMain());
        const mainScreenBounds = robot.Screen.getMain().getBounds();
        return new Region(0, 0, mainScreenBounds.getRight(), mainScreenBounds.getBottom());
    }

    leftClick() {
        this.mouse.click(robot.BUTTON_LEFT);
    }

    rightClick() {
        this.mouse.click(robot.BUTTON_RIGHT);
    }
}
