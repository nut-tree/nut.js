import { NativeAdapter } from "./lib/adapter/native.adapter.class";
import { OpenCVAdapter } from "./lib/adapter/opencv.adapter.class";
import { Assert } from "./lib/assert.class";
import { Clipboard } from "./lib/clipboard.class";
import { Config } from "./lib/config.class";
import { Keyboard } from "./lib/keyboard.class";
import { Mouse } from "./lib/mouse.class";
import { Movement } from "./lib/movement.class";
import { Screen } from "./lib/screen.class";
import { LineHelper } from "./lib/util/linehelper.class";

export { jestMatchers } from "./lib/expect/jest.matcher.function";
export { Config } from "./lib/config.class";
export { Image } from "./lib/image.class";
export { Key } from "./lib/key.enum";
export { Location } from "./lib/location.class";
export { LocationParameters } from "./lib/locationparameters.class";
export { Movement } from "./lib/movement.class";
export { MovementType } from "./lib/movementtype.class";
export { Point } from "./lib/point.class";
export { Region } from "./lib/region.class";

export class Controller {
  public config: Config;
  public readonly assert: Assert;
  public readonly clipboard: Clipboard;
  public readonly keyboard: Keyboard;
  public readonly mouse: Mouse;
  public readonly movement: Movement;
  public readonly screen: Screen;
  private readonly screenActions: OpenCVAdapter;
  private readonly nativeActions: NativeAdapter;

  constructor(configuration?: Config) {
    this.config = configuration || new Config();
    this.screenActions = new OpenCVAdapter();
    this.nativeActions = new NativeAdapter();
    this.clipboard = new Clipboard(this.nativeActions);
    this.keyboard = new Keyboard(this.nativeActions);
    this.mouse = new Mouse(this.config, this.nativeActions);
    this.movement = new Movement(this.nativeActions, new LineHelper());
    this.screen = new Screen(
      this.config,
      this.screenActions,
      this.nativeActions
    );
    this.assert = new Assert(this.screen);
  }
}
