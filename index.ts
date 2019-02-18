import { NativeAdapter } from "./lib/adapter/native.adapter.class";
import { VisionAdapter } from "./lib/adapter/vision.adapter.class";
import { Assert } from "./lib/assert.class";
import { Clipboard } from "./lib/clipboard.class";
import { Keyboard } from "./lib/keyboard.class";
import { Mouse } from "./lib/mouse.class";
import { Movement } from "./lib/movement.class";
import { Screen } from "./lib/screen.class";
import { LineHelper } from "./lib/util/linehelper.class";

export { jestMatchers } from "./lib/expect/jest.matcher.function";
export { Image } from "./lib/image.class";
export { Key } from "./lib/key.enum";
export { Location } from "./lib/location.class";
export { LocationParameters } from "./lib/locationparameters.class";
export { Movement } from "./lib/movement.class";
export { MovementType } from "./lib/movementtype.class";
export { Point } from "./lib/point.class";
export { Region } from "./lib/region.class";

const screenActions = new VisionAdapter();
const nativeActions = new NativeAdapter();

const clipboard = new Clipboard(nativeActions);
const keyboard = new Keyboard(nativeActions);
const mouse = new Mouse(nativeActions);
const movement = new Movement(nativeActions, new LineHelper());
const screen = new Screen(screenActions, nativeActions);
const assert = new Assert(screen);

export { clipboard, keyboard, mouse, movement, screen, assert };
