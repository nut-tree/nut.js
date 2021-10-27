import {NativeAdapter} from "./lib/adapter/native.adapter.class";
import {VisionAdapter} from "./lib/adapter/vision.adapter.class";
import {AssertClass} from "./lib/assert.class";
import {ClipboardClass} from "./lib/clipboard.class";
import {KeyboardClass} from "./lib/keyboard.class";
import {MouseClass} from "./lib/mouse.class";
import {createMovementApi} from "./lib/movement.function";
import {ScreenClass} from "./lib/screen.class";
import {LineHelper} from "./lib/util/linehelper.class";
import {createWindowApi} from "./lib/window.function";
import providerRegistry from "./lib/provider/provider-registry.class";

export {
    AssertClass,
    ClipboardClass,
    KeyboardClass,
    MouseClass,
    ScreenClass,
    providerRegistry
}

export {MatchRequest} from "./lib/match-request.class";
export {MatchResult} from "./lib/match-result.class";
export * from "./lib/provider";

export {jestMatchers} from "./lib/expect/jest.matcher.function";
export {sleep} from "./lib/sleep.function";
export {Image} from "./lib/image.class";
export {Key} from "./lib/key.enum";
export {Button} from "./lib/button.enum";
export {centerOf, randomPointIn} from "./lib/location.function";
export {LocationParameters} from "./lib/locationparameters.class";
export {OptionalSearchParameters} from "./lib/optionalsearchparameters.class";
export {linear} from "./lib/movementtype.function";
export {Point} from "./lib/point.class";
export {Region} from "./lib/region.class";
export {Window} from "./lib/window.class";
export {FileType} from "./lib/file-type.enum";

const screenActions = new VisionAdapter(providerRegistry);
const nativeActions = new NativeAdapter(providerRegistry);
const lineHelper = new LineHelper();

const clipboard = new ClipboardClass(nativeActions);
const keyboard = new KeyboardClass(nativeActions);
const mouse = new MouseClass(nativeActions);
const screen = new ScreenClass(screenActions);
const assert = new AssertClass(screen);

const {straightTo, up, down, left, right} = createMovementApi(nativeActions, lineHelper);
const {getWindows, getActiveWindow} = createWindowApi(nativeActions);

export {
    clipboard,
    keyboard,
    mouse,
    screen,
    assert,
    straightTo,
    up,
    down,
    left,
    right,
    getWindows,
    getActiveWindow,
};
