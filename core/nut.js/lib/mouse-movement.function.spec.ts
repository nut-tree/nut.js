import {
  calculateStepDuration,
  linear,
  calculateMovementTimesteps,
  EasingFunction,
} from "./mouse-movement.function";

describe("MovementType", () => {
  describe("baseStepDuration", () => {
    it("should calculate the base step duration in nanoseconds", () => {
      // GIVEN
      const speedInPixelsPerSecond = 1000;
      const expectedBaseStepDuration = 1_000_000;

      // WHEN
      const result = calculateStepDuration(speedInPixelsPerSecond);

      // THEN
      expect(result).toBe(expectedBaseStepDuration);
    });
  });

  describe("stepDuration", () => {
    it("should call easing function progress to calculate current step duration", () => {
      // GIVEN
      const amountOfSteps = 100;
      const speedInPixelsPerSecond = 1000;
      const easingFunction = jest.fn(() => 0);

      // WHEN
      calculateMovementTimesteps(
        amountOfSteps,
        speedInPixelsPerSecond,
        easingFunction
      );

      // THEN
      expect(easingFunction).toHaveBeenCalledTimes(amountOfSteps);
    });
  });

  describe("linear", () => {
    it("should return a set of linear timesteps, 1000000 nanosecond per step.", () => {
      // GIVEN
      const expected = [1000000, 1000000, 1000000, 1000000, 1000000, 1000000];

      // WHEN
      const result = calculateMovementTimesteps(6, 1000, linear);

      // THEN
      expect(result).toEqual(expected);
    });

    it("should should return a set of linear timesteps, 2000000 nanoseconds per step.", () => {
      // GIVEN
      const expected = [2000000, 2000000, 2000000, 2000000, 2000000, 2000000];

      // WHEN
      const result = calculateMovementTimesteps(6, 500, linear);

      // THEN
      expect(result).toEqual(expected);
    });
  });

  describe("non-linear", () => {
    it("should return progress slowly in the first half, 2000000 nanoseconds per step, then continue with normal speed, 1000000 nanoseconds per step", () => {
      // GIVEN
      const mouseSpeed = 1000;
      const easingFunction: EasingFunction = (p: number) => {
        if (p < 0.5) {
          return -0.5;
        }
        return 0;
      };
      const expected = [2000000, 2000000, 2000000, 1000000, 1000000, 1000000];

      // WHEN
      const result = calculateMovementTimesteps(6, mouseSpeed, easingFunction);

      // THEN
      expect(result).toEqual(expected);
    });
  });
});
