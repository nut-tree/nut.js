import {Screen} from "./screen.class";
import {Keyboard} from "./keyboard.class";
import {Mouse} from "./mouse.class";
import {OpenCVAdapter} from "./adapter/opencv.adapter.class";
import {NativeAdapter} from "./adapter/native.adapter.class";
import {OpenCVProviderEnum} from "./provider/opencv/opencv.provider.enum";
import {NativeProviderEnum} from "./provider/native/native.provider.enum";
import {OpenCV4NodeJSVisionProvider} from "./provider/opencv/opencv4nodejs.provider.class";
import {RobotJsNativeProvider} from "./provider/native/robot-js.provider.class";
import {Movement} from "./movement.class";
import {LineHelper} from "./util/linehelper.class";
import {Bresenham} from "./util/bresenham.class";

export {Image} from "./image.class";
export {Location} from "./location.class";
export {LocationParameters} from "./screen.class";
export {Movement} from "./movement.class";
export {MovementType} from "./movementtype.class";
export {Point} from "./point.class";
export {Region} from "./region.class";

export class Config {
    matchProbability = 0.99;
    mouseSpeed = 1000; // Mouse speed in pixel/second
    openCVProvider = OpenCVProviderEnum.OPENCV4NODEJS;
    nativeProvider = NativeProviderEnum.ROBOT_JS;

    constructor(params = {
        openCVProvider: OpenCVProviderEnum.OPENCV4NODEJS,
        nativeProvider: NativeProviderEnum.ROBOT_JS,
        matchProbability: 0.99,
        mouseSpeed: 1000
    }) {
        this.openCVProvider = params.openCVProvider;
        this.nativeProvider = params.nativeProvider;
        this.matchProbability = params.matchProbability;
        this.mouseSpeed = params.mouseSpeed;
    }
}

export class Nut {
    readonly screen: Screen;
    readonly keyboard: Keyboard;
    readonly mouse: Mouse;
    readonly movement: Movement;
    private readonly screenActions: OpenCVAdapter;
    private readonly nativeActions: NativeAdapter;

    constructor(public config: Config) {
        switch (config.openCVProvider) {
            case OpenCVProviderEnum.OPENCV4NODEJS:
            default:
                this.screenActions = new OpenCVAdapter(new OpenCV4NodeJSVisionProvider());
                break;
        }
        switch (config.nativeProvider) {
            case NativeProviderEnum.ROBOT_JS:
            default:
                this.nativeActions = new NativeAdapter(new RobotJsNativeProvider());
                break;
        }
        this.screen = new Screen(this.config, this.screenActions, this.nativeActions);
        this.keyboard = new Keyboard();
        this.mouse = new Mouse(this.config, this.nativeActions);
        this.movement = new Movement(this.nativeActions, new LineHelper(new Bresenham()));
    }
}
