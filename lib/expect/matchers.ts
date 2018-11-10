import {LocationParameters} from "../locationparameters.class";
import {Mouse} from "../mouse.class";
import {Point} from "../point.class";
import {Screen} from "../screen.class";

export const matchers = {
    toBeAt: async (received: Mouse, position: Point) => {
        const currentPosition = await received.getPosition();

        const success = (currentPosition.x === position.x && currentPosition.y === position.y);

        if (success) {
            return {
                message: () =>
                    `Expected cursor to not be at position ${position.toString()}`,
                pass: true,
            };
        }
        return {
            message: () =>
                `Cursor should be at position ${position.toString()} but is at ${currentPosition.toString()}`,
            pass: false,
        };
    },
    toShow: async (received: Screen, needle: string, confidence?: number) => {
        let locationParams;
        if (confidence) {
            locationParams = new LocationParameters();
            locationParams.matchProbability = confidence;
        }
        try {
            await received.findOnScreen(needle, locationParams);
            return {
                message: () =>
                    `Expected screen to not show ${needle}`,
                pass: true,
            };
        } catch (err) {
            return {
                message: () =>
                    `Screen is not showing ${needle}: ${err}`,
                pass: false,
            };
        }
    },
};
