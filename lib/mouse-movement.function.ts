/**
 * {@link EasingFunction}s are used to modify movement behaviour.
 *
 * See https://easings.net/ for reference
 */
export interface EasingFunction {
    (progressPercentage: number): number;
}

export const calculateBaseStepDuration = (speedInPixelsPerSecond: number) => (1 / speedInPixelsPerSecond) * 1_000_000_000;
export const calculateStepDuration = (currentProgressPercentage: number, baseStepDuration: number, easingFunction: EasingFunction) => {
    let stepDuration = baseStepDuration;
    if (typeof easingFunction === "function") {
        stepDuration += baseStepDuration * easingFunction(currentProgressPercentage);
    }
    return stepDuration;
}
export const calculateMovementTimesteps = (
    amountOfSteps: number,
    speedInPixelsPerSecond: number,
    easingFunction: EasingFunction = linear
): number[] => {
    const timeSteps = [];
    // Duration per movement step in nanoseconds
    let baseStepDuration = calculateBaseStepDuration(speedInPixelsPerSecond);
    baseStepDuration = (isFinite(baseStepDuration) && baseStepDuration > 0) ? baseStepDuration : 0;
    for (let idx = 0; idx < amountOfSteps; ++idx) {
        const stepDuration = calculateStepDuration(idx / amountOfSteps, baseStepDuration, easingFunction);
        timeSteps.push(stepDuration > 0 ? stepDuration : 0);
    }
    return timeSteps;
};

export const linear: EasingFunction = (_: number): number => {
    return 0;
};
