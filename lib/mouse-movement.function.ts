/**
 * {@link EasingFunction}s are used to modify movement behaviour.
 *
 * See https://easings.net/ for reference
 */
export interface EasingFunction {
    (progressPercentage: number): number;
}

export const calculateStepDuration = (speedInPixelsPerSecond: number) => (1 / speedInPixelsPerSecond) * 1_000_000_000;

export const calculateMovementTimesteps = (
    amountOfSteps: number,
    speedInPixelsPerSecond: number,
    easingFunction: EasingFunction = linear
): number[] => {
    return Array(amountOfSteps)
        .fill(speedInPixelsPerSecond)
        .map((speed: number, idx: number) => {
            let speedInPixels = speed;
            if (typeof easingFunction === "function") {
                speedInPixels += easingFunction(idx / amountOfSteps);
            }
            const stepDuration = calculateStepDuration(speedInPixels);
            return (isFinite(stepDuration) && stepDuration > 0) ? stepDuration : 0;
        });
};

export const linear: EasingFunction = (_: number): number => {
    return 0;
};
