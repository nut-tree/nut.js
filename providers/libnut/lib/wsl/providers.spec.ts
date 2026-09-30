import { Button, ColorMode, Key, Point, Region, Size } from "@nut-tree/shared";
import { WindowsHostClient } from "./host-client";
import { createWindowsProviders } from "./providers";
import { KeyboardClass } from "../../../../core/nut.js/lib/keyboard.class";
import { NoopLogProvider } from "../../../../core/nut.js/lib/provider/log/noop-log-provider.class";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";

// sleep() uses the global registry only for logging. Do not load native defaults
// when exercising the real KeyboardClass and its actual timer implementation.
jest.mock("../../../../core/nut.js/lib/provider/provider-registry.class", () => ({
  __esModule: true,
  default: { getLogProvider: () => ({ debug: jest.fn() }) }
}));

describe("WSL Windows providers", () => {
  function setup() {
    const request = jest.fn(async (_command: string, _args?: Record<string, unknown>, _timeout?: number): Promise<{ result: unknown; pixels: Buffer }> => ({ result: null, pixels: Buffer.alloc(0) }));
    const host = { request, close: jest.fn() } as unknown as WindowsHostClient;
    return { request, host, providers: createWindowsProviders(host) };
  }

  it("shares one host across all providers", async () => {
    const { request, providers } = setup();
    await providers.clipboard.copy("é 😀\n");
    await providers.mouse.click(Button.LEFT);
    await providers.keyboard.type("hello");
    expect(request.mock.calls.map(call => call[0])).toEqual(["clipboardWrite", "click", "type"]);
  });

  it("holds a chord in order and releases in the helper without mutating the arguments", async () => {
    const { request, providers } = setup();
    const keys = [Key.LeftControl, Key.LeftShift, Key.A];
    await providers.keyboard.click(...keys);
    expect(keys).toEqual([Key.LeftControl, Key.LeftShift, Key.A]);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith("keyClick", { keys: ["control", "shift", "a"], delay: 10 }, 30010);
  });

  it("maps function, right modifier and keypad keys", async () => {
    const { request, providers } = setup();
    await providers.keyboard.pressKey(Key.RightSuper, Key.F24, Key.NumPad9);
    expect(request).toHaveBeenCalledWith("keys", { keys: ["right_win", "f24", "numpad_9"], down: true, delay: 10 }, 30010);
  });

  it("rejects unsupported keys before sending input", async () => {
    const { request, providers } = setup();
    await expect(providers.keyboard.pressKey(Key.LeftControl, Key.Fn)).rejects.toThrow("Unsupported Windows key");
    expect(request).not.toHaveBeenCalled();
  });

  it("maps horizontal and vertical scroll directions", async () => {
    const { request, providers } = setup();
    await providers.mouse.scrollUp(120); await providers.mouse.scrollDown(120);
    await providers.mouse.scrollLeft(120); await providers.mouse.scrollRight(120);
    expect(request).toHaveBeenNthCalledWith(1, "scroll", { amount: 120, horizontal: false, delay: 100 }, 30100);
    expect(request).toHaveBeenNthCalledWith(2, "scroll", { amount: -120, horizontal: false, delay: 100 }, 30100);
    expect(request).toHaveBeenNthCalledWith(3, "scroll", { amount: -120, horizontal: true, delay: 100 }, 30100);
    expect(request).toHaveBeenNthCalledWith(4, "scroll", { amount: 120, horizontal: true, delay: 100 }, 30100);
  });

  it("uses native desktop coordinates including negative monitor positions", async () => {
    const { request, providers } = setup();
    await providers.mouse.setMousePosition(new Point(-100, 200));
    expect(request).toHaveBeenCalledWith("moveMouse", { x: -100, y: 200, delay: 100 }, 30100);
  });

  it("returns a nut.js Image directly from pixel data", async () => {
    const { request, providers } = setup();
    const pixels = Buffer.from([0, 0, 255, 255]);
    request.mockResolvedValueOnce({ result: { width: 1, height: 1, byteWidth: 4 }, pixels } as never);
    const image = await providers.screen.grabScreen();
    expect(image.data).toBe(pixels);
    expect(image.colorMode).toBe(ColorMode.BGR);
    expect(image.pixelDensity).toEqual({ scaleX: 1, scaleY: 1 });
    expect(image.width).toBe(1);
  });

  it("rejects truncated screenshot data", async () => {
    const { request, providers } = setup();
    request.mockResolvedValueOnce({ result: { width: 1, height: 1, byteWidth: 4 }, pixels: Buffer.alloc(3) } as never);
    await expect(providers.screen.grabScreen()).rejects.toThrow("pixel data");
  });

  it("passes screen regions and highlight parameters", async () => {
    const { request, providers } = setup();
    request.mockResolvedValueOnce({ result: { width: 2, height: 3, byteWidth: 8 }, pixels: Buffer.alloc(24) } as never);
    await providers.screen.grabScreenRegion(new Region(4, 5, 2, 3));
    expect(request).toHaveBeenCalledWith("capture", { x: 4, y: 5, width: 2, height: 3 });
    await providers.screen.highlightScreenRegion(new Region(4, 5, 2, 3), 1000, 0.5);
    expect(request).toHaveBeenCalledWith("highlight", { x: 4, y: 5, width: 2, height: 3, duration: 1000, opacity: 0.5 }, 31000);
  });

  it("implements clipboard state and clearing", async () => {
    const { request, providers } = setup();
    request.mockResolvedValue({ result: true, pixels: Buffer.alloc(0) } as never);
    expect(await providers.clipboard.hasText()).toBe(true);
    expect(await providers.clipboard.clear()).toBe(true);
    expect(request.mock.calls.map(call => call[0])).toEqual(["clipboardHasText", "clipboardClear"]);
  });

  it("implements every window operation", async () => {
    const { request, providers } = setup();
    request.mockResolvedValueOnce({ result: [1], pixels: Buffer.alloc(0) } as never);
    expect(await providers.window.getWindows()).toEqual([1]);
    await providers.window.getActiveWindow(); await providers.window.getWindowTitle(1);
    request.mockResolvedValueOnce({ result: { x: -10, y: 20, width: 30, height: 40 }, pixels: Buffer.alloc(0) } as never);
    expect(await providers.window.getWindowRegion(1)).toEqual(new Region(-10, 20, 30, 40));
    await providers.window.focusWindow(1); await providers.window.moveWindow(1, new Point(5, 6));
    await providers.window.resizeWindow(1, new Size(7, 8));
    await providers.window.minimizeWindow(1); await providers.window.restoreWindow(1);
    expect(request.mock.calls.map(call => call[0])).toEqual(["windows", "activeWindow", "windowTitle", "windowRegion", "focusWindow", "moveWindow", "resizeWindow", "minimizeWindow", "restoreWindow"]);
  });

  it("validates input delays and coordinates", async () => {
    const { request, providers } = setup();
    expect(() => providers.mouse.setMouseDelay(-1)).toThrow("delay");
    expect(() => providers.keyboard.setKeyboardDelay(Infinity)).toThrow("delay");
    await expect(providers.mouse.setMousePosition(new Point(NaN, 0))).rejects.toThrow("x");
    expect(request).not.toHaveBeenCalled();
  });

  it("includes the maximum configured delay in all input command deadlines", async () => {
    const { request, providers } = setup();
    providers.keyboard.setKeyboardDelay(60000);
    providers.mouse.setMouseDelay(60000);
    await providers.keyboard.click(Key.A);
    await providers.keyboard.pressKey(Key.A);
    await providers.keyboard.releaseKey(Key.A);
    await providers.mouse.setMousePosition(new Point(0, 0));
    await providers.mouse.click(Button.LEFT);
    await providers.mouse.doubleClick(Button.LEFT);
    await providers.mouse.pressButton(Button.LEFT);
    await providers.mouse.releaseButton(Button.LEFT);
    await providers.mouse.scrollUp(120);
    for (const [, args, timeout] of request.mock.calls) {
      expect(args?.delay).toBe(60000);
      expect(timeout).toBe(90000);
    }
    expect(request).toHaveBeenCalledTimes(9);
  });

  it("rejects overflowing highlight deadlines before sending the action", async () => {
    const { request, providers } = setup();
    const region = new Region(0, 0, 1, 1);
    await expect(providers.screen.highlightScreenRegion(region, 2147483647 - 30000 + 1, 0.5)).rejects.toThrow("timeout");
    expect(request).not.toHaveBeenCalled();
    await providers.screen.highlightScreenRegion(region, 2147483647 - 30000, 0.5);
    expect(request.mock.calls[0][2]).toBe(2147483647);
  });

  it("does not add provider delay to direct string typing", async () => {
    const { request, providers } = setup();
    providers.keyboard.setKeyboardDelay(60000);
    await providers.keyboard.type("a".repeat(40000));
    expect(request).toHaveBeenCalledWith("type", { text: "a".repeat(40000), delay: 0 });
  });

  it.each([0, 25, 300])("uses the current public string delay once (%i ms)", async milliseconds => {
    jest.useFakeTimers();
    try {
      const { request, providers } = setup();
      const registry = {
        hasKeyboard: () => true, getKeyboard: () => providers.keyboard,
        getLogProvider: () => new NoopLogProvider()
      } as unknown as ProviderRegistry;
      const keyboard = new KeyboardClass(registry);
      keyboard.config.autoDelayMs = milliseconds;
      const start = Date.now();
      const typing = keyboard.type("ab");
      await jest.runAllTimersAsync();
      await typing;
      expect(Date.now() - start).toBe(2 * milliseconds);
      expect(request.mock.calls).toEqual([
        ["type", { text: "a", delay: 0 }], ["type", { text: "b", delay: 0 }]
      ]);
    } finally { jest.useRealTimers(); }
  });
});
