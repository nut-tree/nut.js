import { Point } from "../point.class";
import { Region } from "../region.class";
import { toBeAt } from "./matchers/toBeAt.function";
import { toBeIn } from "./matchers/toBeIn.function";
import { toShow } from "./matchers/toShow.function";
import { FirstArgumentType } from "../typings";
import { ScreenClass } from "../screen.class";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAt: (position: Point) => {};
      toBeIn: (region: Region) => {};
      toShow: (
        needle: FirstArgumentType<typeof ScreenClass.prototype.find>,
        confidence?: number
      ) => {};
    }
  }
}

export const jestMatchers = {
  toBeAt,
  toBeIn,
  toShow,
};
