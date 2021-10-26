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

export interface ProviderRegistry {
    getClipboard(): ClipboardProviderInterface;
    registerClipboardProvider(value: ClipboardProviderInterface): void;

    getImageFinder(): ImageFinderInterface;
    registerImageFinder(value: ImageFinderInterface): void;

    getKeyboard(): KeyboardProviderInterface;
    registerKeyboardProvider(value: KeyboardProviderInterface): void;

    getMouse(): MouseProviderInterface;
    registerMouseProvider(value: MouseProviderInterface): void;

    getScreen(): ScreenProviderInterface;
    registerScreenProvider(value: ScreenProviderInterface): void;

    getWindow(): WindowProviderInterface;
    registerWindowProvider(value: WindowProviderInterface): void;

    getImageReader(): ImageReader;
    registerImageReader(value: ImageReader): void;

    getImageWriter(): ImageWriter;
    registerImageWriter(value: ImageWriter): void;
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

    getClipboard(): ClipboardProviderInterface {
        if (this._clipboard) {
            return this._clipboard;
        }
        throw new Error(`No ClipboardProvider registered`);
    }

    registerClipboardProvider(value: ClipboardProviderInterface) {
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

    getKeyboard(): KeyboardProviderInterface {
        if (this._keyboard) {
            return this._keyboard;
        }
        throw new Error(`No KeyboardProvider registered`);
    }

    registerKeyboardProvider(value: KeyboardProviderInterface) {
        this._keyboard = value;
    }

    getMouse(): MouseProviderInterface {
        if (this._mouse) {
            return this._mouse;
        }
        throw new Error(`No MouseProvider registered`);
    }

    registerMouseProvider(value: MouseProviderInterface) {
        this._mouse = value;
    }

    getScreen(): ScreenProviderInterface {
        if (this._screen) {
            return this._screen;
        }
        throw new Error(`No ScreenProvider registered`);
    }

    registerScreenProvider(value: ScreenProviderInterface) {
        this._screen = value;
    }

    getWindow(): WindowProviderInterface {
        if (this._window) {
            return this._window;
        }
        throw new Error(`No WindowProvider registered`);
    }

    registerWindowProvider(value: WindowProviderInterface) {
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
providerRegistry.registerKeyboardProvider(new Keyboard());
providerRegistry.registerMouseProvider(new Mouse());
providerRegistry.registerScreenProvider(new Screen());
providerRegistry.registerWindowProvider(new Window());

export default providerRegistry;