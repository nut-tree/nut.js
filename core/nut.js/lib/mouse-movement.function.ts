/**
 * {@link EasingFunction}s are used to modify movement behaviour.
 *
 * See https://easings.net/ for reference
 */
export interface EasingFunction {
  (progressPercentage: number): number;
}

const nanoSecondsPerSecond = 1_000_000_000;

export const calculateStepDuration = (speedInPixelsPerSecond: number) =>
  (1 / speedInPixelsPerSecond) * nanoSecondsPerSecond;

export const calculateMovementTimesteps = (
  amountOfSteps: number,
  speedInPixelsPerSecond: number,
  easingFunction: EasingFunction = linear
): number[] => {
  const isEasingFunction = typeof easingFunction === "function";
  return Array(amountOfSteps)
    .fill(speedInPixelsPerSecond)
    .map((speed: number, idx: number) => {
      let speedInPixels = speed;
      if (isEasingFunction) {
        speedInPixels += easingFunction(idx / amountOfSteps) * speedInPixels;
      }
      const stepDuration = calculateStepDuration(speedInPixels);
      return isFinite(stepDuration) && stepDuration > 0 ? stepDuration : 0;
    });
};

export const linear: EasingFunction = (_: number): number => {
  return 0;
};
