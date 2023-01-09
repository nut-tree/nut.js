import { FindInput, ScreenClass } from "../../screen.class";
import { OptionalSearchParameters } from "../../optionalsearchparameters.class";

export const toShow = async (
  received: ScreenClass,
  needle: FindInput,
  confidence?: number
) => {
  let locationParams;
  if (confidence) {
    locationParams = new OptionalSearchParameters();
    locationParams.confidence = confidence;
  }
  const identifier = (await needle).id;
  try {
    await received.find(needle, locationParams);
    return {
      message: () => `Expected screen to not show ${identifier}`,
      pass: true,
    };
  } catch (err) {
    return {
      message: () => `Screen is not showing ${identifier}: ${err}`,
      pass: false,
    };
  }
};
