import {ClipboardProvider} from "./clipboard-provider.interface";
import {ImageFinderInterface} from "./image-finder.interface";
import {KeyboardProvider} from "./keyboard-provider.interface";
import {MouseProvider} from "./mouse-provider.interface";
import {ScreenProvider} from "./screen-provider.interface";
import {WindowProvider} from "./window-provider.interface";

import Clipboard from "./native/clipboardy-clipboard.class";
import Finder from "./opencv/template-matching-finder.class";
import Mouse from "./native/libnut-mouse.class";
import Keyboard from "./native/libnut-keyboard.class";
import Screen from "./native/libnut-screen.class";
import Window from "./native/libnut-window.class";
import {ImageReader} from "./image-reader.type";
import {ImageWriter} from "./image-writer.type";
import ImageReaderImpl from "./opencv/image-reader.class";
import ImageWriterImpl from "./opencv/image-writer.class";

export interface ProviderRegistry {
    getClipboard(): ClipboardProvider;
    registerClipboardProvider(value: ClipboardProvider): void;

    getImageFinder(): ImageFinderInterface;
    registerImageFinder(value: ImageFinderInterface): void;

    getKeyboard(): KeyboardProvider;
    registerKeyboardProvider(value: KeyboardProvider): void;

    getMouse(): MouseProvider;
    registerMouseProvider(value: MouseProvider): void;

    getScreen(): ScreenProvider;
    registerScreenProvider(value: ScreenProvider): void;

    getWindow(): WindowProvider;
    registerWindowProvider(value: WindowProvider): void;

    getImageReader(): ImageReader;
    registerImageReader(value: ImageReader): void;

    getImageWriter(): ImageWriter;
    registerImageWriter(value: ImageWriter): void;
}

class DefaultProviderRegistry implements ProviderRegistry {
    private _clipboard?: ClipboardProvider;
    private _finder?: ImageFinderInterface;
    private _keyboard?: KeyboardProvider;
    private _mouse?: MouseProvider;
    private _screen?: ScreenProvider;
    private _window?: WindowProvider;
    private _imageReader?: ImageReader;
    private _imageWriter?: ImageWriter;

    getClipboard(): ClipboardProvider {
        if (this._clipboard) {
            return this._clipboard;
        }
        throw new Error(`No ClipboardProvider registered`);
    }

    registerClipboardProvider(value: ClipboardProvider) {
        this._clipboard = value;
    }

    getImageFinder(): ImageFinderInterface {
        if (this._finder) {
            return this._finder;
        }
        throw new Error(`No ImageFinder registered`);
    }

    registerImageFinder(value: ImageFinderInterface) {
        this._finder = value;
    }

    getKeyboard(): KeyboardProvider {
        if (this._keyboard) {
            return this._keyboard;
        }
        throw new Error(`No KeyboardProvider registered`);
    }

    registerKeyboardProvider(value: KeyboardProvider) {
        this._keyboard = value;
    }

    getMouse(): MouseProvider {
        if (this._mouse) {
            return this._mouse;
        }
        throw new Error(`No MouseProvider registered`);
    }

    registerMouseProvider(value: MouseProvider) {
        this._mouse = value;
    }

    getScreen(): ScreenProvider {
        if (this._screen) {
            return this._screen;
        }
        throw new Error(`No ScreenProvider registered`);
    }

    registerScreenProvider(value: ScreenProvider) {
        this._screen = value;
    }

    getWindow(): WindowProvider {
        if (this._window) {
            return this._window;
        }
        throw new Error(`No WindowProvider registered`);
    }

    registerWindowProvider(value: WindowProvider) {
        this._window = value;
    }

    getImageReader(): ImageReader {
        if (this._imageReader) {
            return this._imageReader;
        }
        throw new Error(`No ImageReader registered`);
    }
    registerImageReader(value: ImageReader) {
        this._imageReader = value;
    }

    getImageWriter(): ImageWriter {
        if (this._imageWriter) {
            return this._imageWriter;
        }
        throw new Error(`No ImageWriter registered`);
    }
    registerImageWriter(value: ImageWriter) {
        this._imageWriter = value;
    }
}

const providerRegistry = new DefaultProviderRegistry();

providerRegistry.registerClipboardProvider(new Clipboard());
providerRegistry.registerImageFinder(new Finder());
providerRegistry.registerKeyboardProvider(new Keyboard());
providerRegistry.registerMouseProvider(new Mouse());
providerRegistry.registerScreenProvider(new Screen());
providerRegistry.registerWindowProvider(new Window());
providerRegistry.registerImageReader(new ImageReaderImpl());
providerRegistry.registerImageWriter(new ImageWriterImpl());

export default providerRegistry;