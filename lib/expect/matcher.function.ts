import {LocationParameters} from "../locationparameters.class";
import {Mouse} from "../mouse.class";
import {Point} from "../point.class";
import {Region} from "../region.class";
import {Screen} from "../screen.class";

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeAt: (position: Point) => {};
            toBeIn: (region: Region) => {};
            toShow: (needle: string, confidence?: number) => {};
        }
    }
}

function toBeIn(received: Mouse, region: Region) {
    const currentPosition = received.getPosition();

    const inX = (currentPosition.x >= region.left && currentPosition.x <= region.left + region.width);
    const inY = (currentPosition.y >= region.top && currentPosition.y <= region.top + region.height);

    const success = (inX && inY);

    if (success) {
        return {
            message: () =>
                `Expected cursor to be outside of region ${region.toString()}`,
            pass: true,
        };
    }
    return {
        message: () =>
            `Cursor should be within region ${region.toString()} but is at ${currentPosition.toString()}`,
        pass: false,
    };
}

function toBeAt(received: Mouse, position: Point) {
    const currentPosition = received.getPosition();

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
}

async function toShow(received: Screen, needle: string, confidence?: number) {
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
}

const matcherFunction = {
    toBeAt,
    toBeIn,
    toShow,
};

export default matcherFunction;
