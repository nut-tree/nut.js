import { MouseClass } from "../../mouse.class";
import { Point } from "@nut-tree/shared";

export const toBeAt = async (received: MouseClass, position: Point) => {
  const currentPosition = await received.getPosition();

  const success =
    currentPosition.x === position.x && currentPosition.y === position.y;

  if (success) {
    return {
      message: () =>
        `Expected cursor to not be at position ${position.toString()}`,
      pass: true
    };
  }
  return {
    message: () =>
      `Cursor should be at position ${position.toString()} but is at ${currentPosition.toString()}`,
    pass: false
  };
};
