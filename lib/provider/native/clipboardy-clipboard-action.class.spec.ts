import ClipboardAction from "./clipboardy-clipboard-action.class";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("clipboardy action", () => {
  describe("copy", () => {
    it("should resolve", async done => {
      // GIVEN
      const SUT = new ClipboardAction();
      const testText = "test";

      // WHEN

      // THEN
      await SUT.copy(testText);
      done();
    });
  });
  describe("hasText", () => {
    it("should return true when text has been copied", async done => {
      // GIVEN
      const SUT = new ClipboardAction();
      const testText = "test";

      // WHEN
      await SUT.copy(testText);

      // THEN
      await expect(SUT.hasText()).resolves.toBeTruthy();
      done();
    });
  });
});
