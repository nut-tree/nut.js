import {calculateBaseStepDuration, calculateStepDuration, linear, calculateMovementTimesteps} from "./mouse-movement.function";

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
        it("should call easing function with current progress to calculate current step duration", () => {
            // GIVEN
            const baseStepDuraton = 1_000_000;
            const currentProgress = 1.0;
            const easingFunction = jest.fn(() => 0);

            // WHEN
            const result = calculateStepDuration(currentProgress, baseStepDuraton, easingFunction);

            // THEN
            expect(result).toBe(baseStepDuraton);
            expect(easingFunction).toBeCalledTimes(1);
            expect(easingFunction).toBeCalledWith(currentProgress);
        })
    });

    describe('linear', () => {
        it("should return a set of linear timesteps, 1000000 nanosecond per step.", () => {
            const expected = [1000000, 1000000, 1000000, 1000000, 1000000, 1000000];
            expect(calculateMovementTimesteps(6, 1000, linear)).toEqual(expected);
        });

        it("should should return a set of linear timesteps, 2000000 nanoseconds per step.", () => {
            const expected = [2000000, 2000000, 2000000, 2000000, 2000000, 2000000];
            expect(calculateMovementTimesteps(6, 500, linear)).toEqual(expected);
        });
    });
})
;
