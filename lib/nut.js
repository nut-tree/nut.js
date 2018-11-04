"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_adapter_class_1 = require("./adapter/native.adapter.class");
const opencv_adapter_class_1 = require("./adapter/opencv.adapter.class");
const keyboard_class_1 = require("./keyboard.class");
const mouse_class_1 = require("./mouse.class");
const movement_class_1 = require("./movement.class");
const native_provider_enum_1 = require("./provider/native/native.provider.enum");
const robot_js_provider_class_1 = require("./provider/native/robot-js.provider.class");
const opencv_provider_enum_1 = require("./provider/opencv/opencv.provider.enum");
const opencv4nodejs_provider_class_1 = require("./provider/opencv/opencv4nodejs.provider.class");
const screen_class_1 = require("./screen.class");
const bresenham_class_1 = require("./util/bresenham.class");
const linehelper_class_1 = require("./util/linehelper.class");
var config_class_1 = require("./config.class");
exports.Config = config_class_1.Config;
var image_class_1 = require("./image.class");
exports.Image = image_class_1.Image;
var location_class_1 = require("./location.class");
exports.Location = location_class_1.Location;
var locationparameters_class_1 = require("./locationparameters.class");
exports.LocationParameters = locationparameters_class_1.LocationParameters;
var movement_class_2 = require("./movement.class");
exports.Movement = movement_class_2.Movement;
var movementtype_class_1 = require("./movementtype.class");
exports.MovementType = movementtype_class_1.MovementType;
var point_class_1 = require("./point.class");
exports.Point = point_class_1.Point;
var region_class_1 = require("./region.class");
exports.Region = region_class_1.Region;
class Nut {
    constructor(config) {
        this.config = config;
        switch (config.openCVProvider) {
            case opencv_provider_enum_1.OpenCVProviderEnum.OPENCV4NODEJS:
            default:
                this.screenActions = new opencv_adapter_class_1.OpenCVAdapter(new opencv4nodejs_provider_class_1.OpenCV4NodeJSVisionProvider());
                break;
        }
        switch (config.nativeProvider) {
            case native_provider_enum_1.NativeProviderEnum.ROBOT_JS:
            default:
                this.nativeActions = new native_adapter_class_1.NativeAdapter(new robot_js_provider_class_1.RobotJsNativeProvider());
                break;
        }
        this.screen = new screen_class_1.Screen(this.config, this.screenActions, this.nativeActions);
        this.keyboard = new keyboard_class_1.Keyboard();
        this.mouse = new mouse_class_1.Mouse(this.config, this.nativeActions);
        this.movement = new movement_class_1.Movement(this.nativeActions, new linehelper_class_1.LineHelper(new bresenham_class_1.Bresenham()));
    }
}
exports.Nut = Nut;
//# sourceMappingURL=nut.js.map