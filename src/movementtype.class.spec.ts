import {MovementType} from "./movementtype.class";

describe("MovementType", () => {
    it("should return a set of linear timesteps, one millisecond per step.", () => {
        const expected = [1, 1, 1, 1, 1, 1];
        expect(MovementType.linear(6, 1000)).toEqual(expected);
    });

    it("should threshold movement speed to one pixel per millisecond in case of faster movement.", () => {
        const expected = [1, 1, 1, 1, 1, 1];
        expect(MovementType.linear(6, 2000)).toEqual(expected);
    });

    it("should should return a set of linear timesteps, two milliseconds per step.", () => {
        const expected = [2, 2, 2, 2, 2, 2];
        expect(MovementType.linear(6, 500)).toEqual(expected);
    });

    it("should floor movement to three milliseconds per step.", () => {
        const expected = [3, 3, 3, 3, 3, 3];
        expect(MovementType.linear(6, 300)).toEqual(expected);
    });
});
