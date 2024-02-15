import { ScreenClass } from "../../screen.class";
import { FindInput, isRegion, OptionalSearchParameters, Region } from "@nut-tree/shared";
import { screen } from "../../../index";

export const toShow = async <PROVIDER_DATA>(
  received: ScreenClass | Region,
  needle: FindInput,
  parameters?: OptionalSearchParameters<PROVIDER_DATA>
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
        pass: true
      };
    } catch (err) {
      return {
        message: () => `Screen is not showing ${identifier}: ${err}`,
        pass: false
      };
    }
  } else {
    try {
      await received.find(needle, parameters);
      return {
        message: () => `Expected screen to not show ${identifier}`,
        pass: true
      };
    } catch (err) {
      return {
        message: () => `Screen is not showing ${identifier}: ${err}`,
        pass: false
      };
    }
  }
};
