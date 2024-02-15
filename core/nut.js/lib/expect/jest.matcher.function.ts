import { FindInput, OptionalSearchParameters, Point, Region, RGBA } from "@nut-tree/shared";
import { toBeAt } from "./matchers/toBeAt.function";
import { toBeIn } from "./matchers/toBeIn.function";
import { toShow } from "./matchers/toShow.function";
import { toHaveColor } from "./matchers/toHaveColor.function";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAt: (position: Point) => ReturnType<typeof toBeAt>;
      toBeIn: (region: Region) => ReturnType<typeof toBeIn>;
      // @ts-ignore
      toShow: <PROVIDER_DATA>(
        needle: FindInput,
        parameters?: OptionalSearchParameters<PROVIDER_DATA>
      ) => ReturnType<typeof toShow>;
      toHaveColor: (color: RGBA) => ReturnType<typeof toHaveColor>;
    }
  }
}

export const jestMatchers = {
  toBeAt,
  toBeIn,
  toShow,
  toHaveColor
};
