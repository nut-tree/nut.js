import robot = require("robot-js");
import {Image} from "../../image.class";
import {Point} from "../../point.class";
import {Region} from "../../region.class";
import {INativeProviderInterface} from "./INativeProviderInterface";

export class RobotJsNativeProvider implements INativeProviderInterface {

    private mouse: any;

    constructor() {
        this.mouse = robot.Mouse();
        robot.Screen.synchronize();
    }

    public grabScreen(): Promise<Image> {
        return new Promise(((resolve, reject) => {
            if (robot.Screen.synchronize()) {
                const img = new robot.Image();
                const mainScree = robot.Screen.getMain();
                robot.Screen.grabScreen(img, mainScree.getBounds());
                resolve(new Image(
                    img.getWidth(),
                    img.getHeight(),
                    img.getData(),
                ));
            }
            reject("Unable to fetch screen content.");
        }));
    }

    public grabScreenRegion(region: Region): Promise<Image> {
        return new Promise(((resolve, reject) => {
            if (robot.Screen.synchronize()) {
                const bounds = new robot.Bounds(
                    region.left,
                    region.top,
                    region.width,
                    region.height,
                );
                if (bounds !== undefined) {
                    const img = new robot.Image();
                    robot.Screen.grabScreen(img, bounds);
                    resolve(new Image(
                        img.getWidth(),
                        img.getHeight(),
                        img.getData(),
                    ));
                }
                resolve(this.grabScreen());
            }
            reject("Unable to fetch screen content.");
        }));
    }

    public setMouseDelay(delay: number): void {
        this.mouse.autoDelay.min = delay;
        this.mouse.autoDelay.max = delay;
    }

    public setMousePosition(p: Point): void {
        robot.Mouse.setPos(p.x, p.y);
    }

    public currentMousePosition(): Point {
        const robotPoint = robot.Mouse.getPos();
        return new Point(robotPoint.x, robotPoint.y);
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
        return new Region(0, 0, mainScreenBounds.getRight(), mainScreenBounds.getBottom());
    }

    public leftClick() {
        this.mouse.click(robot.BUTTON_LEFT);
    }

    public rightClick() {
        this.mouse.click(robot.BUTTON_RIGHT);
    }
}
