import {LocationParameters} from "../../locationparameters.class";
import {ScreenClass} from "../../screen.class";
import {FirstArgumentType} from "../../typings";

export const toShow = async (
    received: ScreenClass,
    needle: FirstArgumentType<typeof ScreenClass.prototype.find>,
    confidence?: number,
) => {
    let locationParams;
    if (confidence) {
        locationParams = new LocationParameters();
        locationParams.confidence = confidence;
    }
    try {
        await received.find(needle, locationParams);
        return {
            message: () => `Expected screen to not show ${needle}`,
            pass: true,
        };
    } catch (err) {
        return {
            message: () => `Screen is not showing ${needle}: ${err}`,
            pass: false,
        };
    }
};
