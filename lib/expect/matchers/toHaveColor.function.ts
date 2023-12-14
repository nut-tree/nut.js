import { Point, RGBA, screen } from "../../../index";

export const toHaveColor = async (received: Point, needle: RGBA) => {
  const color = await screen.colorAt(received);
  const match = color.toHex() === needle.toHex();
  if (match) {
    return {
      message: () =>
        `Expected pixel ${received.toString()} not to to have color ${needle.toHex()}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `Expected pixel ${received.toString()} to have color ${needle.toHex()} but is ${color.toHex()}`,
      pass: false,
    };
  }
};
