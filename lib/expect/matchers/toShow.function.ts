import { FindInput, ScreenClass } from "../../screen.class";
import { OptionalSearchParameters } from "../../optionalsearchparameters.class";
import { isRegion, Region } from "../../region.class";
import { screen } from "../../../index";

export const toShow = async <PROVIDER_DATA>(
  received: ScreenClass | Region,
  needle: FindInput,
  parameters?: OptionalSearchParameters<PROVIDER_DATA>,
) => {
  const identifier = (await needle).id;
  if (isRegion(received)) {
    if (parameters != null) {
      parameters.searchRegion = received;
    } else {
      parameters = { searchRegion: received };
    }
    try {
      await screen.find(needle, parameters);
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
  } else {
    try {
      await received.find(needle, parameters);
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
  }
};
