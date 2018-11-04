import {NativeProviderEnum} from "./provider/native/native.provider.enum";
import {OpenCVProviderEnum} from "./provider/opencv/opencv.provider.enum";

export class Config {
    public matchProbability = 0.99;
    public mouseSpeed = 1000; // Mouse speed in pixel/second
    public openCVProvider = OpenCVProviderEnum.OPENCV4NODEJS;
    public nativeProvider = NativeProviderEnum.ROBOT_JS;

    constructor(params = {
        matchProbability: 0.99,
        mouseSpeed: 1000,
        nativeProvider: NativeProviderEnum.ROBOT_JS,
        openCVProvider: OpenCVProviderEnum.OPENCV4NODEJS,
    }) {
        this.openCVProvider = params.openCVProvider;
        this.nativeProvider = params.nativeProvider;
        this.matchProbability = params.matchProbability;
        this.mouseSpeed = params.mouseSpeed;
    }
}
