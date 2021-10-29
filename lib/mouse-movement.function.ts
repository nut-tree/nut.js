/**
 * {@link EasingFunction}s are used to modify movement behaviour.
 *
 * See https://easings.net/ for reference
 */
export interface EasingFunction {
    (progressPercentage: number): number;
}

export const calculateBaseStepDuration = (speedInPixelsPerSecond: number) => (1 / speedInPixelsPerSecond) * 1_000_000_000;

export const calculateMovementTimesteps = (
    amountOfSteps: number,
    speedInPixelsPerSecond: number,
    easingFunction: EasingFunction = linear
): number[] => {
    // Duration per movement step in nanoseconds
    let baseStepDuration = calculateBaseStepDuration(speedInPixelsPerSecond);
    baseStepDuration = (isFinite(baseStepDuration) && baseStepDuration > 0) ? baseStepDuration : 0;

    return Array(amountOfSteps)
        .fill(baseStepDuration)
        .map((duration: number, idx: number) => {
            if (typeof easingFunction === "function") {
                const stepDuration = duration * (1 + easingFunction(idx / amountOfSteps));
                return stepDuration > 0 ? stepDuration : 0;
            }
            return duration;
        });
};

export const linear: EasingFunction = (_: number): number => {
    return 0;
};
