import { NativeAdapter } from "./lib/adapter/native.adapter.class";
import { VisionAdapter } from "./lib/adapter/vision.adapter.class";
import { Assert } from "./lib/assert.class";
import { Clipboard } from "./lib/clipboard.class";
import { Keyboard } from "./lib/keyboard.class";
import { Mouse } from "./lib/mouse.class";
import { createMovementApi } from "./lib/movement.function";
import { Screen } from "./lib/screen.class";
import { LineHelper } from "./lib/util/linehelper.class";

export { jestMatchers } from "./lib/expect/jest.matcher.function";
export { Image } from "./lib/image.class";
export { Key } from "./lib/key.enum";
export { centerOf, randomPointIn } from "./lib/location.function";
export { LocationParameters } from "./lib/locationparameters.class";
export { linear } from "./lib/movementtype.function";
export { Point } from "./lib/point.class";
export { Region } from "./lib/region.class";

const screenActions = new VisionAdapter();
const nativeActions = new NativeAdapter();
const lineHelper = new LineHelper();

const clipboard = new Clipboard(nativeActions);
const keyboard = new Keyboard(nativeActions);
const mouse = new Mouse(nativeActions);
const screen = new Screen(screenActions);
const assert = new Assert(screen);

const {straightTo, up, down, left, right} = createMovementApi(nativeActions, lineHelper);

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
};
