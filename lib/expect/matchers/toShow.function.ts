import { LocationParameters } from "../../locationparameters.class";
import { ScreenClass } from "../../screen.class";

export const toShow = async (
  received: ScreenClass,
  needle: string,
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
