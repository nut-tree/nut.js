import { ClipboardProviderInterface } from "./clipboard-provider.interface";
import { ImageFinderInterface } from "./image-finder.interface";
import { KeyboardProviderInterface } from "./keyboard-provider.interface";
import { MouseProviderInterface } from "./mouse-provider.interface";
import { ScreenProviderInterface } from "./screen-provider.interface";
import { WindowProviderInterface } from "./window-provider.interface";

import Clipboard from "./native/clipboardy-clipboard.class";
import Mouse from "./native/libnut-mouse.class";
import Keyboard from "./native/libnut-keyboard.class";
import Screen from "./native/libnut-screen.class";
import Window from "./native/libnut-window.class";
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

export interface ProviderRegistry {
  getClipboard(): ClipboardProviderInterface;

  registerClipboardProvider(value: ClipboardProviderInterface): void;

  getKeyboard(): KeyboardProviderInterface;

  registerKeyboardProvider(value: KeyboardProviderInterface): void;

  getMouse(): MouseProviderInterface;

  registerMouseProvider(value: MouseProviderInterface): void;

  getScreen(): ScreenProviderInterface;

  registerScreenProvider(value: ScreenProviderInterface): void;

  getWindow(): WindowProviderInterface;

  registerWindowProvider(value: WindowProviderInterface): void;

  getImageFinder(): ImageFinderInterface;

  registerImageFinder(value: ImageFinderInterface): void;

  getImageReader(): ImageReader;

  registerImageReader(value: ImageReader): void;

  getImageWriter(): ImageWriter;

  registerImageWriter(value: ImageWriter): void;

  getImageProcessor(): ImageProcessor;

  registerImageProcessor(value: ImageProcessor): void;

  getLogProvider(): LogProviderInterface;

  registerLogProvider(value: LogProviderInterface): void;

  getTextFinder(): TextFinderInterface;

  registerTextFinder(value: TextFinderInterface): void;

  getWindowFinder(): WindowFinderInterface;

  registerWindowFinder(value: WindowFinderInterface): void;

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

providerRegistry.registerClipboardProvider(new Clipboard());
providerRegistry.registerKeyboardProvider(new Keyboard());
providerRegistry.registerMouseProvider(new Mouse());
providerRegistry.registerScreenProvider(new Screen());
providerRegistry.registerWindowProvider(new Window());
providerRegistry.registerImageWriter(new ImageWriterImpl());
providerRegistry.registerImageReader(new ImageReaderImpl());
providerRegistry.registerImageProcessor(new ImageProcessorImpl());
providerRegistry.registerLogProvider(new NoopLogProvider());
providerRegistry.registerColorFinder(new ColorFinderImpl());

export default providerRegistry;
