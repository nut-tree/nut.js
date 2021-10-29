import {
    calculateBaseStepDuration,
    linear,
    calculateMovementTimesteps
} from "./mouse-movement.function";

describe("MovementType", () => {
    describe("baseStepDuration", () => {
        it("should calculate the base step duration in nanoseconds", () => {
            // GIVEN
            const speedInPixelsPerSecond = 1000;
            const expectedBaseStepDuration = 1_000_000;

            // WHEN
            const result = calculateBaseStepDuration(speedInPixelsPerSecond);

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
            calculateMovementTimesteps(amountOfSteps, speedInPixelsPerSecond, easingFunction);

            // THEN
            expect(easingFunction).toBeCalledTimes(amountOfSteps);
        })
    });

    describe('linear', () => {
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
});