import { Key } from "@nut-tree/shared";
import { KeyboardClass } from "./keyboard.class";
import { mockPartial } from "sneer";
import { KeyboardProviderInterface, LogProviderInterface, ProviderRegistry } from "@nut-tree/provider-interfaces";
import { NoopLogProvider } from "./provider/log/noop-log-provider.class";

jest.setTimeout(10000);

beforeEach(() => {
  jest.clearAllMocks();
});

const providerRegistryMock = mockPartial<ProviderRegistry>({
  getLogProvider(): LogProviderInterface {
    return new NoopLogProvider();
  },
  getKeyboard(): KeyboardProviderInterface {
    return mockPartial<KeyboardProviderInterface>({
      setKeyboardDelay: jest.fn(),
    });
  },
  hasKeyboard(): boolean {
    return true;
  },
});

describe("Keyboard", () => {
  it("should have a default delay of 300 ms", () => {
    // GIVEN
    const SUT = new KeyboardClass(providerRegistryMock);

    // WHEN

    // THEN
    expect(SUT.config.autoDelayMs).toEqual(300);
  });

  it("should pass input strings down to the type call.", async () => {
    // GIVEN
    const SUT = new KeyboardClass(providerRegistryMock);
    const payload = "Test input!";

    const typeMock = jest.fn();
    providerRegistryMock.getKeyboard = jest.fn(() =>
      mockPartial<KeyboardProviderInterface>({
        setKeyboardDelay: jest.fn(),
        type: typeMock,
      })
    );

    // WHEN
    await SUT.type(payload);

    // THEN
    expect(typeMock).toHaveBeenCalledTimes(payload.length);
    for (const char of payload.split("")) {
      expect(typeMock).toHaveBeenCalledWith(char);
    }
  });

  it("should pass multiple input strings down to the type call.", async () => {
    // GIVEN
    const SUT = new KeyboardClass(providerRegistryMock);
    const payload = ["Test input!", "Array test2"];

    const typeMock = jest.fn();
    providerRegistryMock.getKeyboard = jest.fn(() =>
      mockPartial<KeyboardProviderInterface>({
        setKeyboardDelay: jest.fn(),
        type: typeMock,
      })
    );

    // WHEN
    await SUT.type(...payload);

    // THEN
    expect(typeMock).toHaveBeenCalledTimes(payload.join(" ").length);
    for (const char of payload.join(" ").split("")) {
      expect(typeMock).toHaveBeenCalledWith(char);
    }
  });

  it("should pass input keys down to the click call.", async () => {
    // GIVEN
    const SUT = new KeyboardClass(providerRegistryMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    const clickMock = jest.fn();
    providerRegistryMock.getKeyboard = jest.fn(() =>
      mockPartial<KeyboardProviderInterface>({
        setKeyboardDelay: jest.fn(),
        click: clickMock,
      })
    );

    // WHEN
    await SUT.type(...payload);

    // THEN
    expect(clickMock).toHaveBeenCalledTimes(1);
    expect(clickMock).toHaveBeenCalledWith(...payload);
  });

  it("should pass a list of input keys down to the click call.", async () => {
    // GIVEN
    const SUT = new KeyboardClass(providerRegistryMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    const clickMock = jest.fn();
    providerRegistryMock.getKeyboard = jest.fn(() =>
      mockPartial<KeyboardProviderInterface>({
        setKeyboardDelay: jest.fn(),
        click: clickMock,
      })
    );

    // WHEN
    for (const key of payload) {
      await SUT.type(key);
    }

    // THEN
    expect(clickMock).toHaveBeenCalledTimes(payload.length);
  });

  it("should pass a list of input keys down to the pressKey call.", async () => {
    // GIVEN
    const SUT = new KeyboardClass(providerRegistryMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    const keyMock = jest.fn();
    providerRegistryMock.getKeyboard = jest.fn(() =>
      mockPartial<KeyboardProviderInterface>({
        setKeyboardDelay: jest.fn(),
        pressKey: keyMock,
      })
    );

    // WHEN
    for (const key of payload) {
      await SUT.pressKey(key);
    }

    // THEN
    expect(keyMock).toHaveBeenCalledTimes(payload.length);
  });

  it("should pass a list of input keys down to the releaseKey call.", async () => {
    // GIVEN
    const SUT = new KeyboardClass(providerRegistryMock);
    const payload = [Key.A, Key.S, Key.D, Key.F];

    const keyMock = jest.fn();
    providerRegistryMock.getKeyboard = jest.fn(() =>
      mockPartial<KeyboardProviderInterface>({
        setKeyboardDelay: jest.fn(),
        releaseKey: keyMock,
      })
    );

    // WHEN
    for (const key of payload) {
      await SUT.releaseKey(key);
    }

    // THEN
    expect(keyMock).toHaveBeenCalledTimes(payload.length);
  });

  describe("autoDelayMs", () => {
    it("pressKey should respect configured delay", async () => {
      // GIVEN
      const SUT = new KeyboardClass(providerRegistryMock);
      const delay = 100;
      SUT.config.autoDelayMs = delay;

      const keyMock = jest.fn();
      providerRegistryMock.getKeyboard = jest.fn(() =>
        mockPartial<KeyboardProviderInterface>({
          setKeyboardDelay: jest.fn(),
          pressKey: keyMock,
        })
      );

      // WHEN
      const start = Date.now();
      await SUT.pressKey(Key.A);
      const duration = Date.now() - start;

      // THEN
      expect(duration).toBeGreaterThanOrEqual(delay);
    });

    it("should pass a list of input keys down to the releaseKey call.", async () => {
      // GIVEN
      const SUT = new KeyboardClass(providerRegistryMock);
      const delay = 100;
      SUT.config.autoDelayMs = delay;

      const keyMock = jest.fn();
      providerRegistryMock.getKeyboard = jest.fn(() =>
        mockPartial<KeyboardProviderInterface>({
          setKeyboardDelay: jest.fn(),
          releaseKey: keyMock,
        })
      );

      // WHEN
      const start = Date.now();
      await SUT.releaseKey(Key.A);
      const duration = Date.now() - start;

      // THEN
      expect(duration).toBeGreaterThanOrEqual(delay);
    });
  });
});
