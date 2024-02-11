import { ClipboardProviderInterface } from "./clipboard-provider.interface";
import { ImageFinderInterface } from "./image-finder.interface";
import { KeyboardProviderInterface } from "./keyboard-provider.interface";
import { MouseProviderInterface } from "./mouse-provider.interface";
import { ScreenProviderInterface } from "./screen-provider.interface";
import { WindowProviderInterface } from "./window-provider.interface";

import { ImageReader } from "./image-reader.type";
import { ImageWriter } from "./image-writer.type";
import { ImageProcessor } from "./image-processor.interface";

import ImageReaderImpl from "./io/jimp-image-reader.class";
import ImageWriterImpl from "./io/jimp-image-writer.class";
import ImageProcessorImpl from "./image/jimp-image-processor.class";
import { LogProviderInterface, wrapLogger } from "./log-provider.interface";
import { NoopLogProvider } from "./log/noop-log-provider.class";
import { TextFinderInterface } from "./text-finder.interface";
import { WindowFinderInterface } from "./window-finder.interface";
import { ColorFinderInterface } from "./color-finder.interface";
import ColorFinderImpl from "./color/color-finder.class";
import {
  DISABLE_DEFAULT_CLIPBOARD_PROVIDER_ENV_VAR,
  DISABLE_DEFAULT_KEYBOARD_PROVIDER_ENV_VAR,
  DISABLE_DEFAULT_MOUSE_PROVIDER_ENV_VAR,
  DISABLE_DEFAULT_PROVIDERS_ENV_VAR,
  DISABLE_DEFAULT_SCREEN_PROVIDER_ENV_VAR,
  DISABLE_DEFAULT_WINDOW_PROVIDER_ENV_VAR,
} from "../constants";

export interface ProviderRegistry {
  hasClipboard(): boolean;

  getClipboard(): ClipboardProviderInterface;

  registerClipboardProvider(value: ClipboardProviderInterface): void;

  hasKeyboard(): boolean;

  getKeyboard(): KeyboardProviderInterface;

  registerKeyboardProvider(value: KeyboardProviderInterface): void;

  hasMouse(): boolean;

  getMouse(): MouseProviderInterface;

  registerMouseProvider(value: MouseProviderInterface): void;

  hasScreen(): boolean;

  getScreen(): ScreenProviderInterface;

  registerScreenProvider(value: ScreenProviderInterface): void;

  hasWindow(): boolean;

  getWindow(): WindowProviderInterface;

  registerWindowProvider(value: WindowProviderInterface): void;

  hasImageFinder(): boolean;

  getImageFinder(): ImageFinderInterface;

  registerImageFinder(value: ImageFinderInterface): void;

  hasImageReader(): boolean;

  getImageReader(): ImageReader;

  registerImageReader(value: ImageReader): void;

  hasImageWriter(): boolean;

  getImageWriter(): ImageWriter;

  registerImageWriter(value: ImageWriter): void;

  hasImageProcessor(): boolean;

  getImageProcessor(): ImageProcessor;

  registerImageProcessor(value: ImageProcessor): void;

  hasLogProvider(): boolean;

  getLogProvider(): LogProviderInterface;

  registerLogProvider(value: LogProviderInterface): void;

  hasTextFinder(): boolean;

  getTextFinder(): TextFinderInterface;

  registerTextFinder(value: TextFinderInterface): void;

  hasWindowFinder(): boolean;

  getWindowFinder(): WindowFinderInterface;

  registerWindowFinder(value: WindowFinderInterface): void;

  hasColorFinder(): boolean;

  getColorFinder(): ColorFinderInterface;

  registerColorFinder(value: ColorFinderInterface): void;
}

class DefaultProviderRegistry implements ProviderRegistry {
  private _clipboard?: ClipboardProviderInterface;
  private _imageFinder?: ImageFinderInterface;
  private _keyboard?: KeyboardProviderInterface;
  private _mouse?: MouseProviderInterface;
  private _screen?: ScreenProviderInterface;
  private _window?: WindowProviderInterface;
  private _imageReader?: ImageReader;
  private _imageWriter?: ImageWriter;
  private _imageProcessor?: ImageProcessor;
  private _logProvider?: LogProviderInterface;
  private _textFinder?: TextFinderInterface;
  private _windowFinder?: WindowFinderInterface;
  private _colorFinder?: ColorFinderInterface;

  hasClipboard(): boolean {
    return this._clipboard != null;
  }

  getClipboard = (): ClipboardProviderInterface => {
    if (this._clipboard) {
      return this._clipboard;
    }
    const error = new Error(`No ClipboardProvider registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerClipboardProvider = (value: ClipboardProviderInterface) => {
    this._clipboard = value;
    this.getLogProvider().trace("Registered new clipboard provider", value);
  };

  hasImageFinder(): boolean {
    return this._imageFinder != null;
  }

  getImageFinder = (): ImageFinderInterface => {
    if (this._imageFinder) {
      return this._imageFinder;
    }
    const error = new Error(`No ImageFinder registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerImageFinder = (value: ImageFinderInterface) => {
    this._imageFinder = value;
    this.getLogProvider().trace("Registered new image finder", value);
  };

  hasKeyboard(): boolean {
    return this._keyboard != null;
  }

  getKeyboard = (): KeyboardProviderInterface => {
    if (this._keyboard) {
      return this._keyboard;
    }
    const error = new Error(`No KeyboardProvider registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerKeyboardProvider = (value: KeyboardProviderInterface) => {
    this._keyboard = value;
    this.getLogProvider().trace("Registered new keyboard provider", value);
  };

  hasMouse(): boolean {
    return this._mouse != null;
  }

  getMouse = (): MouseProviderInterface => {
    if (this._mouse) {
      return this._mouse;
    }
    const error = new Error(`No MouseProvider registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerMouseProvider = (value: MouseProviderInterface) => {
    this._mouse = value;
    this.getLogProvider().trace("Registered new mouse provider", value);
  };

  hasScreen(): boolean {
    return this._screen != null;
  }

  getScreen = (): ScreenProviderInterface => {
    if (this._screen) {
      return this._screen;
    }
    const error = new Error(`No ScreenProvider registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerScreenProvider = (value: ScreenProviderInterface) => {
    this._screen = value;
    this.getLogProvider().trace("Registered new screen provider", value);
  };

  hasWindow(): boolean {
    return this._window != null;
  }

  getWindow = (): WindowProviderInterface => {
    if (this._window) {
      return this._window;
    }
    const error = new Error(`No WindowProvider registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerWindowProvider = (value: WindowProviderInterface) => {
    this._window = value;
    this.getLogProvider().trace("Registered new window provider", value);
  };

  hasTextFinder(): boolean {
    return this._textFinder != null;
  }

  getTextFinder = (): TextFinderInterface => {
    if (this._textFinder) {
      return this._textFinder;
    }
    const error = new Error(`No TextFinder registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerTextFinder = (value: TextFinderInterface) => {
    this._textFinder = value;
    this.getLogProvider().trace("Registered new TextFinder provider", value);
  };

  hasWindowFinder(): boolean {
    return this._windowFinder != null;
  }

  getWindowFinder = (): WindowFinderInterface => {
    if (this._windowFinder) {
      return this._windowFinder;
    }
    const error = new Error(`No WindowFinder registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerWindowFinder = (value: WindowFinderInterface) => {
    this._windowFinder = value;
    this.getLogProvider().trace("Registered new WindowFinder provider", value);
  };

  hasImageReader(): boolean {
    return this._imageReader != null;
  }

  getImageReader = (): ImageReader => {
    if (this._imageReader) {
      return this._imageReader;
    }
    const error = new Error(`No ImageReader registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerImageReader = (value: ImageReader) => {
    this._imageReader = value;
    this.getLogProvider().trace("Registered new image reader", value);
  };

  hasImageWriter(): boolean {
    return this._imageWriter != null;
  }

  getImageWriter = (): ImageWriter => {
    if (this._imageWriter) {
      return this._imageWriter;
    }
    const error = new Error(`No ImageWriter registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerImageWriter = (value: ImageWriter) => {
    this._imageWriter = value;
    this.getLogProvider().trace("Registered new image writer", value);
  };

  hasImageProcessor(): boolean {
    return this._imageProcessor != null;
  }

  getImageProcessor = (): ImageProcessor => {
    if (this._imageProcessor) {
      return this._imageProcessor;
    }
    const error = new Error(`No ImageProcessor registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerImageProcessor = (value: ImageProcessor): void => {
    this._imageProcessor = value;
    this.getLogProvider().trace("Registered new image processor", value);
  };

  hasLogProvider(): boolean {
    return this._logProvider != null;
  }

  getLogProvider = (): LogProviderInterface => {
    if (this._logProvider) {
      return this._logProvider;
    }

    // Fallback to avoid errors caused by logging
    return new NoopLogProvider();
  };

  registerLogProvider = (value: LogProviderInterface): void => {
    this._logProvider = wrapLogger(value);
    this.getLogProvider().trace("Registered new log provider", value);
  };

  hasColorFinder(): boolean {
    return this._colorFinder != null;
  }

  getColorFinder = (): ColorFinderInterface => {
    if (this._colorFinder) {
      return this._colorFinder;
    }
    const error = new Error(`No ColorFinder registered`);
    this.getLogProvider().error(error);
    throw error;
  };

  registerColorFinder = (value: ColorFinderInterface): void => {
    this._colorFinder = value;
    this.getLogProvider().trace("Registered new ColorFinder provider", value);
  };
}

const providerRegistry = new DefaultProviderRegistry();

providerRegistry.registerImageWriter(new ImageWriterImpl());
providerRegistry.registerImageReader(new ImageReaderImpl());
providerRegistry.registerImageProcessor(new ImageProcessorImpl());
providerRegistry.registerColorFinder(new ColorFinderImpl());
providerRegistry.registerLogProvider(new NoopLogProvider());

if (!process.env[DISABLE_DEFAULT_PROVIDERS_ENV_VAR]) {
  if (!process.env[DISABLE_DEFAULT_CLIPBOARD_PROVIDER_ENV_VAR]) {
    const Clipboard = require("@nut-tree/default-clipboard-provider").default;
    providerRegistry.registerClipboardProvider(new Clipboard());
  }
  if (!process.env[DISABLE_DEFAULT_KEYBOARD_PROVIDER_ENV_VAR]) {
    const { DefaultKeyboardAction } = require("@nut-tree/libnut");
    providerRegistry.registerKeyboardProvider(new DefaultKeyboardAction());
  }
  if (!process.env[DISABLE_DEFAULT_MOUSE_PROVIDER_ENV_VAR]) {
    const { DefaultMouseAction } = require("@nut-tree/libnut");
    providerRegistry.registerMouseProvider(new DefaultMouseAction());
  }
  if (!process.env[DISABLE_DEFAULT_SCREEN_PROVIDER_ENV_VAR]) {
    const { DefaultScreenAction } = require("@nut-tree/libnut");
    providerRegistry.registerScreenProvider(new DefaultScreenAction());
  }
  if (!process.env[DISABLE_DEFAULT_WINDOW_PROVIDER_ENV_VAR]) {
    const { DefaultWindowAction } = require("@nut-tree/libnut");
    providerRegistry.registerWindowProvider(new DefaultWindowAction());
  }
}

export default providerRegistry;
