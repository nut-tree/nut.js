import {ClipboardProviderInterface} from "./clipboard-provider.interface";
import {ImageFinderInterface} from "./image-finder.interface";
import {KeyboardProviderInterface} from "./keyboard-provider.interface";
import {MouseProviderInterface} from "./mouse-provider.interface";
import {ScreenProviderInterface} from "./screen-provider.interface";
import {WindowProviderInterface} from "./window-provider.interface";

import Clipboard from "./native/clipboardy-clipboard.class";
import Mouse from "./native/libnut-mouse.class";
import Keyboard from "./native/libnut-keyboard.class";
import Screen from "./native/libnut-screen.class";
import Window from "./native/libnut-window.class";
import {ImageReader} from "./image-reader.type";
import {ImageWriter} from "./image-writer.type";
import {ImageProcessor} from "./image-processor.interface";

import ImageReaderImpl from "./io/jimp-image-reader.class";
import ImageWriterImpl from "./io/jimp-image-writer.class";
import ImageProcessorImpl from "./image/jimp-image-processor.class";
import {LogProviderInterface, wrapLogger} from "./log-provider.interface";
import { NoopLogProvider } from "./io/noop-log-provider.class";

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
}

class DefaultProviderRegistry implements ProviderRegistry {
    private _clipboard?: ClipboardProviderInterface;
    private _finder?: ImageFinderInterface;
    private _keyboard?: KeyboardProviderInterface;
    private _mouse?: MouseProviderInterface;
    private _screen?: ScreenProviderInterface;
    private _window?: WindowProviderInterface;
    private _imageReader?: ImageReader;
    private _imageWriter?: ImageWriter;
    private _imageProcessor?: ImageProcessor;
    private _logProvider?: LogProviderInterface;

    getClipboard(): ClipboardProviderInterface {
        if (this._clipboard) {
            this.getLogProvider().debug("Fetching clipboard provider");
            return this._clipboard;
        }
        throw new Error(`No ClipboardProvider registered`);
    }

    registerClipboardProvider(value: ClipboardProviderInterface) {
        this._clipboard = value;
        this.getLogProvider().info("Registered new clipboard provider", value);
    }

    getImageFinder(): ImageFinderInterface {
        if (this._finder) {
            this.getLogProvider().debug("Fetching image finder");
            return this._finder;
        }
        throw new Error(`No ImageFinder registered`);
    }

    registerImageFinder(value: ImageFinderInterface) {
        this._finder = value;
        this.getLogProvider().info("Registered new image finder", value);
    }

    getKeyboard(): KeyboardProviderInterface {
        if (this._keyboard) {
            this.getLogProvider().debug("Fetching keyboard provider");
            return this._keyboard;
        }
        throw new Error(`No KeyboardProvider registered`);
    }

    registerKeyboardProvider(value: KeyboardProviderInterface) {
        this._keyboard = value;
        this.getLogProvider().info("Registered new keyboard provider", value);
    }

    getMouse(): MouseProviderInterface {
        if (this._mouse) {
            this.getLogProvider().debug("Fetching mouse provider");
            return this._mouse;
        }
        throw new Error(`No MouseProvider registered`);
    }

    registerMouseProvider(value: MouseProviderInterface) {
        this._mouse = value;
        this.getLogProvider().info("Registered new mouse provider", value);
    }

    getScreen(): ScreenProviderInterface {
        if (this._screen) {
            this.getLogProvider().debug("Fetching screen provider");
            return this._screen;
        }
        throw new Error(`No ScreenProvider registered`);
    }

    registerScreenProvider(value: ScreenProviderInterface) {
        this._screen = value;
        this.getLogProvider().info("Registered new screen provider", value);
    }

    getWindow(): WindowProviderInterface {
        if (this._window) {
            this.getLogProvider().debug("Fetching window provider");
            return this._window;
        }
        throw new Error(`No WindowProvider registered`);
    }

    registerWindowProvider(value: WindowProviderInterface) {
        this._window = value;
        this.getLogProvider().info("Registered new window provider", value);
    }

    getImageReader(): ImageReader {
        if (this._imageReader) {
            this.getLogProvider().debug("Fetching image reader");
            return this._imageReader;
        }
        throw new Error(`No ImageReader registered`);
    }

    registerImageReader(value: ImageReader) {
        this._imageReader = value;
        this.getLogProvider().info("Registered new image reader", value);
    }

    getImageWriter(): ImageWriter {
        if (this._imageWriter) {
            this.getLogProvider().debug("Fetching image writer");
            return this._imageWriter;
        }
        throw new Error(`No ImageWriter registered`);
    }

    registerImageWriter(value: ImageWriter) {
        this._imageWriter = value;
        this.getLogProvider().info("Registered new image writer", value);
    }

    getImageProcessor(): ImageProcessor {
        if (this._imageProcessor) {
            this.getLogProvider().debug("Fetching image processor");
            return this._imageProcessor;
        }
        throw new Error(`No ImageProcessor registered`);
    }

    registerImageProcessor(value: ImageProcessor): void {
        this._imageProcessor = value;
        this.getLogProvider().info("Registered new image processor", value);
    }

    getLogProvider(): LogProviderInterface {
        if (this._logProvider) {
            return this._logProvider;
        }

        // Fallback to avoid errors caused by logging
        return new NoopLogProvider();
    }

    registerLogProvider(value: LogProviderInterface): void {
        this._logProvider = wrapLogger(value);
        this.getLogProvider().info("Registered new log provider", value);
    }
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

export default providerRegistry;
