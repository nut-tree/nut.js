import { NativeAdapter } from "./adapter/native.adapter.class";
import { Key } from "./key.enum";
import { Keyboard } from "./keyboard.class";

jest.mock("./adapter/native.adapter.class");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Keyboard", () => {
  it("should have a default delay of 20 ms", () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new Keyboard(adapterMock);

    // WHEN

    // THEN
    expect(SUT.config.autoDelayMs).toEqual(20);
  });

  it("should pass input strings down to the type call.", () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new Keyboard(adapterMock);
    const payload = "Test input!";

    // WHEN
    SUT.type(payload);

    // THEN
    expect(adapterMock.type).toHaveBeenCalledTimes(1);
    expect(adapterMock.type).toHaveBeenCalledWith(payload);
  });

  it("should pass multiple input strings down to the type call.", () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new Keyboard(adapterMock);
    const payload = ["Test input!", "Array test2"];

    // WHEN
    SUT.type(...payload);

    // THEN
    expect(adapterMock.type).toHaveBeenCalledTimes(1);
    expect(adapterMock.type).toHaveBeenCalledWith(payload.join(" "));
  });

  it("should pass input keys down to the click call.", () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new Keyboard(adapterMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    // WHEN
    SUT.type(...payload);

    // THEN
    expect(adapterMock.click).toHaveBeenCalledTimes(1);
    expect(adapterMock.click).toHaveBeenCalledWith(...payload);
  });

  it("should pass a list of input keys down to the click call.", () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new Keyboard(adapterMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    // WHEN
    for (const key of payload) {
      SUT.type(key);
    }

    // THEN
    expect(adapterMock.click).toHaveBeenCalledTimes(payload.length);
  });

  it("should pass a list of input keys down to the pressKey call.", () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new Keyboard(adapterMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    // WHEN
    for (const key of payload) {
      SUT.pressKey(key);
    }

    // THEN
    expect(adapterMock.pressKey).toHaveBeenCalledTimes(payload.length);
  });

  it("should pass a list of input keys down to the releaseKey call.", () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new Keyboard(adapterMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    // WHEN
    for (const key of payload) {
      SUT.releaseKey(key);
    }

    // THEN
    expect(adapterMock.releaseKey).toHaveBeenCalledTimes(payload.length);
  });
});
