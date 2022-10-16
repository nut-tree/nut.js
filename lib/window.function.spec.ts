import { createWindowApi } from "./window.function";
import { Window } from "./window.class";
import providerRegistry from "./provider/provider-registry.class";

jest.mock("jimp", () => {});

describe("WindowApi", () => {
  describe("getWindows", () => {
    it("should return a list of open Windows", async () => {
      // GIVEN
      const SUT = createWindowApi(providerRegistry);

      // WHEN
      const windows = await SUT.getWindows();

      // THEN
      windows.forEach((wnd) => {
        expect(wnd).toEqual(expect.any(Window));
      });
    });
  });

  describe("getActiveWindow", () => {
    it("should return the a single Window which is currently active", async () => {
      // GIVEN
      const SUT = createWindowApi(providerRegistry);

      // WHEN
      const window = await SUT.getActiveWindow();

      // THEN
      expect(window).toEqual(expect.any(Window));
    });
  });
});
