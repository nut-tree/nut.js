import ClipboardAction from "./clipboardy-clipboard.class";

jest.mock("jimp", () => {});

beforeEach(() => {
  jest.resetAllMocks();
});

describe("clipboardy action", () => {
  describe("copy", () => {
    it("should resolve", async () => {
      // GIVEN
      const SUT = new ClipboardAction();
      const testText = "test";

      // WHEN

      // THEN
      await SUT.copy(testText);
    });
  });
  describe("hasText", () => {
    it("should return true when text has been copied", async () => {
      // GIVEN
      const SUT = new ClipboardAction();
      const testText = "test";

      // WHEN
      await SUT.copy(testText);

      // THEN
      await expect(SUT.hasText()).resolves.toBeTruthy();
    });
  });
});
