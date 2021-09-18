import { NativeAdapter } from "./adapter/native.adapter.class";
import { Key } from "./key.enum";
import { KeyboardClass } from "./keyboard.class";

jest.mock("./adapter/native.adapter.class");
jest.setTimeout(10000);

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Keyboard", () => {
  it("should have a default delay of 300 ms", () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new KeyboardClass(adapterMock);

    // WHEN

    // THEN
    expect(SUT.config.autoDelayMs).toEqual(300);
  });

  it("should pass input strings down to the type call.", async () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new KeyboardClass(adapterMock);
    const payload = "Test input!";

    // WHEN
    await SUT.type(payload);

    // THEN
    expect(adapterMock.type).toHaveBeenCalledTimes(payload.length);
    for (const char of payload.split("")) {
      expect(adapterMock.type).toHaveBeenCalledWith(char);
    }
  });

  it("should pass multiple input strings down to the type call.", async () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new KeyboardClass(adapterMock);
    const payload = ["Test input!", "Array test2"];

    // WHEN
    await SUT.type(...payload);

    // THEN
    expect(adapterMock.type).toHaveBeenCalledTimes(payload.join(" ").length);
    for (const char of payload.join(" ").split("")) {
      expect(adapterMock.type).toHaveBeenCalledWith(char);
    }
  });

  it("should pass input keys down to the click call.", async () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new KeyboardClass(adapterMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    // WHEN
    await SUT.type(...payload);

    // THEN
    expect(adapterMock.click).toHaveBeenCalledTimes(1);
    expect(adapterMock.click).toHaveBeenCalledWith(...payload);
  });

  it("should pass a list of input keys down to the click call.", async () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new KeyboardClass(adapterMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    // WHEN
    for (const key of payload) {
      await SUT.type(key);
    }

    // THEN
    expect(adapterMock.click).toHaveBeenCalledTimes(payload.length);
  });

  it("should pass a list of input keys down to the pressKey call.", async () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new KeyboardClass(adapterMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    // WHEN
    for (const key of payload) {
      await SUT.pressKey(key);
    }

    // THEN
    expect(adapterMock.pressKey).toHaveBeenCalledTimes(payload.length);
  });

  it("should pass a list of input keys down to the releaseKey call.", async () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new KeyboardClass(adapterMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    // WHEN
    for (const key of payload) {
      await SUT.releaseKey(key);
    }

    // THEN
    expect(adapterMock.releaseKey).toHaveBeenCalledTimes(payload.length);
  });
});
