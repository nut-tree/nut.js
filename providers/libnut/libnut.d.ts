export interface Bitmap {
  width: number;
  height: number;
  image: any;
  byteWidth: number;
  bitsPerPixel: number;
  bytesPerPixel: number;
}

export interface Screen {
  capture(x?: number, y?: number, width?: number, height?: number): Bitmap;
  highlight(x: number, y: number, width: number, height: number, duration: number, opacity: number): void;
}

export interface Point {
  x: number;
  y: number
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum Key {
  Backspace = "backspace",
  Delete = "delete",
  Return = "return",
  Tab = "tab",
  Escape = "escape",
  Up = "up",
  Down = "down",
  Right = "right",
  Left = "left",
  Home = "home",
  End = "end",
  PageUp = "pageup",
  PageDown = "pagedown",
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
  F = "f",
  G = "g",
  H = "h",
  I = "i",
  J = "j",
  K = "k",
  L = "l",
  M = "m",
  N = "n",
  O = "o",
  P = "p",
  Q = "q",
  R = "r",
  S = "s",
  T = "t",
  U = "u",
  V = "v",
  W = "w",
  X = "x",
  Y = "y",
  Z = "z",

  Comma = ",",
  Period = ".",
  Slash = "/",

  Semicolon = ";",
  Quote = "'",
  LeftBracket = "[",
  RightBracket = "]",

  Backslash = "\\",
  Minus = "-",
  Equal = "=",
  Grave = "`",

  F1 = "f1",
  F2 = "f2",
  F3 = "f3",
  F4 = "f4",
  F5 = "f5",
  F6 = "f6",
  F7 = "f7",
  F8 = "f8",
  F9 = "f9",
  F10 = "f10",
  F11 = "f11",
  F12 = "f12",
  F13 = "f13",
  F14 = "f14",
  F15 = "f15",
  F16 = "f16",
  F17 = "f17",
  F18 = "f18",
  F19 = "f19",
  F20 = "f20",
  F21 = "f21",
  F22 = "f22",
  F23 = "f23",
  F24 = "f24",

  Meta = "meta",
  RightMeta = "right_meta",

  Cmd = "cmd",
  RightCmd = "right_cmd",

  Win = "win",
  RightWin = "right_win",

  Alt = "alt",
  RightAlt = "right_alt",

  Control = "control",
  RightControl = "right_control",

  Shift = "shift",
  RightShift = "right_shift",

  Space = "space",

  PrintScreen = "printscreen",
  Insert = "insert",
  Menu = "menu",

  Function = "fn",
  Pause = "pause",

  CapsLock = "caps_lock",
  NumLock = "num_lock",
  ScrollLock = "scroll_lock",

  AudioMute = "audio_mute",
  AudioVolDown = "audio_vol_down",
  AudioVolUp = "audio_vol_up",
  AudioPlay = "audio_play",
  AudioStop = "audio_stop",
  AudioPause = "audio_pause",
  AudioPrev = "audio_prev",
  AudioNext = "audio_next",
  AudioRewind = "audio_rewind",
  AudioForward = "audio_forward",
  AudioRepeat = "audio_repeat",
  AudioRandom = "audio_random",

  Num0 = "0",
  Num1 = "1",
  Num2 = "2",
  Num3 = "3",
  Num4 = "4",
  Num5 = "5",
  Num6 = "6",
  Num7 = "7",
  Num8 = "8",
  Num9 = "9",

  Numpad0 = "numpad_0",
  Numpad1 = "numpad_1",
  Numpad2 = "numpad_2",
  Numpad3 = "numpad_3",
  Numpad4 = "numpad_4",
  Numpad5 = "numpad_5",
  Numpad6 = "numpad_6",
  Numpad7 = "numpad_7",
  Numpad8 = "numpad_8",
  Numpad9 = "numpad_9",
  NumpadDecimal = "numpad_decimal",
  NumPadEqual = "numpad_equal",

  Enter = "enter",
  Add = "add",
  Subtract = "subtract",
  Multiply = "multiply",
  Divide = "divide",

  LightsMonUp = "lights_mon_up",
  LightsMonDown = "lights_mon_down",
  LightsKbdToggle = "lights_kbd_toggle",
  LightsKbdUp = "lights_kbd_up",
  LightsKbdDown = "lights_kbd_down"
}

export function setKeyboardDelay(ms: number): void;
export function keyTap(key: string, modifier?: string | string[]): void;
export function keyToggle(
    key: string,
    down: string,
    modifier?: string | string[]
): void;
export function typeString(string: string): void;
export function typeStringDelayed(string: string, cpm: number): void;
export function setMouseDelay(delay: number): void;
export function moveMouse(x: number, y: number): void;
export function moveMouseSmooth(x: number, y: number): void;
export function mouseClick(button?: string, double?: boolean): void;
export function mouseToggle(down?: string, button?: string): void;
export function dragMouse(x: number, y: number): void;
export function scrollMouse(x: number, y: number): void;
export function getMousePos(): Point;
export function getScreenSize(): Size;
export function getWindows(): number[];
export function getActiveWindow(): number;
export function getWindowRect(handle: number): Rect;
export function getWindowTitle(handle: number): string;

/**
 * Sets the focus to a specific window using its handle.
 *
 * @param {number} handle - The handle ID of the window to be focused.
 * @returns {void}
 */
export function focusWindow(handle: number): boolean

/**
 * Resizes a window by its handle to the given width and height.
 * The window is moved to the x & y coordinates if specified.
 *
 * @param {number} handle - The handle ID of the window to be resized.
 * @param {Size} newSize - The new size of the window.
 * @returns {void}
 */
export function resizeWindow(handle: number, newSize: Size): boolean

/**
 * Moves a window by its handle to the given x and y coordinates.
 *
 * @param {number} handle - The handle ID of the window to be resized.
 * @param {Point} newOrigin - The new size of the window.
 * @returns {void}
 */
export function moveWindow(handle: number, newOrigin: Point): boolean

export const screen: Screen;
