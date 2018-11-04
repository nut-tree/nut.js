import {NativeAdapter} from "./adapter/native.adapter.class";
import {OpenCVAdapter} from "./adapter/opencv.adapter.class";
import {Config} from "./config.class";
import {Keyboard} from "./keyboard.class";
import {Mouse} from "./mouse.class";
import {Movement} from "./movement.class";
import {NativeProviderEnum} from "./provider/native/native.provider.enum";
import {RobotJsNativeProvider} from "./provider/native/robot-js.provider.class";
import {OpenCVProviderEnum} from "./provider/opencv/opencv.provider.enum";
import {OpenCV4NodeJSVisionProvider} from "./provider/opencv/opencv4nodejs.provider.class";
import {Screen} from "./screen.class";
import {Bresenham} from "./util/bresenham.class";
import {LineHelper} from "./util/linehelper.class";

export {Config} from "./config.class";
export {Image} from "./image.class";
export {Location} from "./location.class";
export {LocationParameters} from "./locationparameters.class";
export {Movement} from "./movement.class";
export {MovementType} from "./movementtype.class";
export {Point} from "./point.class";
export {Region} from "./region.class";

export class Nut {
    public readonly screen: Screen;
    public readonly keyboard: Keyboard;
    public readonly mouse: Mouse;
    public readonly movement: Movement;
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
