import {
  ClipboardProviderInterface, KeyboardProviderInterface, MouseProviderInterface,
  ScreenProviderInterface, WindowProviderInterface
} from "@nut-tree/provider-interfaces";
import { Button, ColorMode, Image, Key, Point, Region, Size } from "@nut-tree/shared";
import { commandTimeout, WindowsHostClient } from "./host-client";

function integer(value: number, name: string, minimum = -2147483648, maximum = 2147483647): number {
  if (!Number.isInteger(value) || value < minimum || value > maximum) throw new Error(`Invalid ${name}: ${value}`);
  return value;
}

function delay(value: number): number { return integer(value, "input delay", 0, 60000); }

function keyName(key: Key): string {
  const name = Key[key];
  if (!name) throw new Error(`Invalid key: ${key}`);
  if (/^[A-Z]$/.test(name)) return name.toLowerCase();
  if (/^F\d+$/.test(name)) return name.toLowerCase();
  if (/^Num\d$/.test(name)) return name.substring(3);
  if (/^NumPad\d$/.test(name)) return `numpad_${name.substring(6)}`;
  const names: Record<string, string> = {
    Escape: "escape", Print: "printscreen", ScrollLock: "scroll_lock", Pause: "pause",
    Grave: "`", Minus: "-", Equal: "=", Backspace: "backspace", Insert: "insert",
    Home: "home", PageUp: "pageup", NumLock: "num_lock", Divide: "divide",
    Multiply: "multiply", Subtract: "subtract", Tab: "tab", LeftBracket: "[",
    RightBracket: "]", Backslash: "\\", Delete: "delete", End: "end", PageDown: "pagedown",
    Add: "add", CapsLock: "caps_lock", Semicolon: ";", Quote: "'", Return: "return",
    LeftShift: "shift", RightShift: "right_shift", Comma: ",", Period: ".", Slash: "/",
    Up: "up", Enter: "enter", LeftControl: "control", RightControl: "right_control",
    LeftSuper: "win", LeftWin: "win", LeftCmd: "win", RightSuper: "right_win",
    RightWin: "right_win", RightCmd: "right_win", LeftAlt: "alt", RightAlt: "right_alt",
    Space: "space", Menu: "menu", Left: "left", Down: "down", Right: "right",
    Decimal: "numpad_decimal", Clear: "clear", AudioMute: "audio_mute",
    AudioVolDown: "audio_vol_down", AudioVolUp: "audio_vol_up", AudioPlay: "audio_play",
    AudioStop: "audio_stop", AudioPause: "audio_pause", AudioPrev: "audio_prev", AudioNext: "audio_next"
  };
  if (!names[name]) throw new Error(`Unsupported Windows key: ${name}`);
  return names[name];
}

class WindowsKeyboard implements KeyboardProviderInterface {
  private delay = 10;
  constructor(private readonly host: WindowsHostClient) {}
  setKeyboardDelay(value: number): void { this.delay = delay(value); }
  async type(text: string): Promise<void> {
    // KeyboardClass already spaces characters using its current public config.
    // Match native typeString: provider delays apply to key operations only.
    await this.host.request("type", { text, delay: 0 });
  }
  async click(...keys: Key[]): Promise<void> {
    await this.host.request("keyClick", { keys: keys.map(keyName), delay: this.delay }, commandTimeout(this.delay));
  }
  async pressKey(...keys: Key[]): Promise<void> {
    await this.host.request("keys", { keys: keys.map(keyName), down: true, delay: this.delay }, commandTimeout(this.delay));
  }
  async releaseKey(...keys: Key[]): Promise<void> {
    await this.host.request("keys", { keys: keys.map(keyName), down: false, delay: this.delay }, commandTimeout(this.delay));
  }
}

class WindowsMouse implements MouseProviderInterface {
  private delay = 100;
  constructor(private readonly host: WindowsHostClient) {}
  setMouseDelay(value: number): void { this.delay = delay(value); }
  private button(value: Button): number {
    if (value === Button.LEFT) return 0;
    if (value === Button.MIDDLE) return 1;
    if (value === Button.RIGHT) return 2;
    throw new Error(`Invalid mouse button: ${value}`);
  }
  async setMousePosition(position: Point): Promise<void> {
    await this.host.request("moveMouse", { x: integer(position.x, "x"), y: integer(position.y, "y"), delay: this.delay }, commandTimeout(this.delay));
  }
  async currentMousePosition(): Promise<Point> {
    const { result } = await this.host.request<{ x: number; y: number }>("cursorPosition");
    return new Point(integer(result.x, "cursor x"), integer(result.y, "cursor y"));
  }
  async click(button: Button): Promise<void> {
    await this.host.request("click", { button: this.button(button), count: 1, delay: this.delay }, commandTimeout(this.delay));
  }
  async doubleClick(button: Button): Promise<void> {
    await this.host.request("click", { button: this.button(button), count: 2, delay: this.delay }, commandTimeout(this.delay));
  }
  leftClick(): Promise<void> { return this.click(Button.LEFT); }
  rightClick(): Promise<void> { return this.click(Button.RIGHT); }
  middleClick(): Promise<void> { return this.click(Button.MIDDLE); }
  async pressButton(button: Button): Promise<void> {
    await this.host.request("mouseButton", { button: this.button(button), down: true, delay: this.delay }, commandTimeout(this.delay));
  }
  async releaseButton(button: Button): Promise<void> {
    await this.host.request("mouseButton", { button: this.button(button), down: false, delay: this.delay }, commandTimeout(this.delay));
  }
  private async scroll(amount: number, horizontal: boolean): Promise<void> {
    await this.host.request("scroll", { amount: integer(amount, "scroll amount"), horizontal, delay: this.delay }, commandTimeout(this.delay));
  }
  scrollUp(amount: number): Promise<void> { return this.scroll(amount, false); }
  scrollDown(amount: number): Promise<void> { return this.scroll(-amount, false); }
  scrollLeft(amount: number): Promise<void> { return this.scroll(-amount, true); }
  scrollRight(amount: number): Promise<void> { return this.scroll(amount, true); }
}

class WindowsScreen implements ScreenProviderInterface {
  constructor(private readonly host: WindowsHostClient) {}
  private async capture(args: Record<string, unknown>): Promise<Image> {
    const { result, pixels } = await this.host.request<{ width: number; height: number; byteWidth: number }>("capture", args);
    const width = integer(result.width, "image width", 1);
    const height = integer(result.height, "image height", 1);
    if (result.byteWidth !== width * 4 || pixels.length !== width * height * 4) throw new Error("Invalid Windows screenshot dimensions or pixel data");
    return new Image(width, height, pixels, 4, "wslWindowsScreen", 32, result.byteWidth, ColorMode.BGR, { scaleX: 1, scaleY: 1 });
  }
  grabScreen(): Promise<Image> { return this.capture({}); }
  grabScreenRegion(region: Region): Promise<Image> {
    return this.capture({ x: integer(region.left, "left", 0), y: integer(region.top, "top", 0),
      width: integer(region.width, "width", 1), height: integer(region.height, "height", 1) });
  }
  async highlightScreenRegion(region: Region, duration: number, opacity: number): Promise<void> {
    if (!Number.isFinite(opacity) || opacity < 0 || opacity > 1) throw new Error("Opacity must be between 0 and 1");
    const milliseconds = integer(duration, "highlight duration", 0);
    await this.host.request("highlight", { x: integer(region.left, "left"), y: integer(region.top, "top"),
      width: integer(region.width, "width", 1), height: integer(region.height, "height", 1), duration: milliseconds, opacity }, commandTimeout(milliseconds));
  }
  async screenSize(): Promise<Region> {
    const { result } = await this.host.request<{ width: number; height: number }>("screenSize");
    return new Region(0, 0, integer(result.width, "screen width", 1), integer(result.height, "screen height", 1));
  }
  async screenWidth(): Promise<number> { return (await this.screenSize()).width; }
  async screenHeight(): Promise<number> { return (await this.screenSize()).height; }
}

class WindowsClipboard implements ClipboardProviderInterface {
  constructor(private readonly host: WindowsHostClient) {}
  async hasText(): Promise<boolean> { return (await this.host.request<boolean>("clipboardHasText")).result; }
  async clear(): Promise<boolean> { return (await this.host.request<boolean>("clipboardClear")).result; }
  async copy(text: string): Promise<void> { await this.host.request("clipboardWrite", { text }); }
  async paste(): Promise<string> { return (await this.host.request<string>("clipboardRead")).result; }
}

class WindowsWindow implements WindowProviderInterface {
  constructor(private readonly host: WindowsHostClient) {}
  async getWindows(): Promise<number[]> { return (await this.host.request<number[]>("windows")).result; }
  async getActiveWindow(): Promise<number> { return (await this.host.request<number>("activeWindow")).result; }
  async getWindowTitle(handle: number): Promise<string> { return (await this.host.request<string>("windowTitle", { handle })).result; }
  async getWindowRegion(handle: number): Promise<Region> {
    const { result } = await this.host.request<{ x: number; y: number; width: number; height: number }>("windowRegion", { handle });
    return new Region(result.x, result.y, result.width, result.height);
  }
  async focusWindow(handle: number): Promise<boolean> { return (await this.host.request<boolean>("focusWindow", { handle })).result; }
  async moveWindow(handle: number, origin: Point): Promise<boolean> {
    return (await this.host.request<boolean>("moveWindow", { handle, x: integer(origin.x, "x"), y: integer(origin.y, "y") })).result;
  }
  async resizeWindow(handle: number, size: Size): Promise<boolean> {
    return (await this.host.request<boolean>("resizeWindow", { handle, width: integer(size.width, "width", 1), height: integer(size.height, "height", 1) })).result;
  }
  async minimizeWindow(handle: number): Promise<boolean> { return (await this.host.request<boolean>("minimizeWindow", { handle })).result; }
  async restoreWindow(handle: number): Promise<boolean> { return (await this.host.request<boolean>("restoreWindow", { handle })).result; }
}

export function createWindowsProviders(host = new WindowsHostClient()): {
  clipboard: ClipboardProviderInterface;
  keyboard: KeyboardProviderInterface;
  mouse: MouseProviderInterface;
  screen: ScreenProviderInterface;
  window: WindowProviderInterface;
  close: () => void;
} {
  return { clipboard: new WindowsClipboard(host), keyboard: new WindowsKeyboard(host),
    mouse: new WindowsMouse(host), screen: new WindowsScreen(host), window: new WindowsWindow(host), close: host.close };
}
