import {
  ClipboardProviderInterface,
  ColorFinderInterface,
  ImageFinderInterface,
  ImageProcessor,
  ImageReader,
  ImageWriter,
  KeyboardProviderInterface,
  LogProviderInterface,
  MouseProviderInterface,
  ScreenProviderInterface,
  TextFinderInterface,
  WindowFinderInterface,
  WindowProviderInterface
} from ".";

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