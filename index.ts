import {NativeAdapter} from "./lib/adapter/native.adapter.class";
import {OpenCVAdapter} from "./lib/adapter/opencv.adapter.class";
import {Config} from "./lib/config.class";
import {Keyboard} from "./lib/keyboard.class";
import {Mouse} from "./lib/mouse.class";
import {Movement} from "./lib/movement.class";
import {NativeProviderEnum} from "./lib/provider/native/native.provider.enum";
import {RobotJsNativeProvider} from "./lib/provider/native/robot-js.provider.class";
import {OpenCVProviderEnum} from "./lib/provider/opencv/opencv.provider.enum";
import {OpenCV4NodeJSVisionProvider} from "./lib/provider/opencv/opencv4nodejs.provider.class";
import {Screen} from "./lib/screen.class";
import {LineHelper} from "./lib/util/linehelper.class";

export {Config} from "./lib/config.class";
export {Image} from "./lib/image.class";
export {Key} from "./lib/key.enum";
export {Location} from "./lib/location.class";
export {LocationParameters} from "./lib/locationparameters.class";
export {Movement} from "./lib/movement.class";
export {MovementType} from "./lib/movementtype.class";
export {Point} from "./lib/point.class";
export {Region} from "./lib/region.class";

export class Controller {
    public config: Config;
    public readonly screen: Screen;
    public readonly keyboard: Keyboard;
    public readonly mouse: Mouse;
    public readonly movement: Movement;
    private readonly screenActions: OpenCVAdapter;
    private readonly nativeActions: NativeAdapter;

    constructor(configuration?: Config) {
        this.config = configuration || new Config();
        switch (this.config.openCVProvider) {
            case OpenCVProviderEnum.OPENCV4NODEJS:
            default:
                this.screenActions = new OpenCVAdapter(new OpenCV4NodeJSVisionProvider());
                break;
        }
        switch (this.config.nativeProvider) {
            case NativeProviderEnum.ROBOT_JS:
            default:
                this.nativeActions = new NativeAdapter(new RobotJsNativeProvider());
                break;
        }
        this.screen = new Screen(this.config, this.screenActions, this.nativeActions);
        this.keyboard = new Keyboard(this.nativeActions);
        this.mouse = new Mouse(this.config, this.nativeActions);
        this.movement = new Movement(this.nativeActions, new LineHelper());
    }
}
