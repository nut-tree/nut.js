import providerRegistry from "./provider-registry.class";
import {
  ClipboardProviderInterface,
  ImageProcessor,
  ImageReader,
  ImageWriter,
  KeyboardProviderInterface,
  MouseProviderInterface,
  ScreenProviderInterface,
  WindowProviderInterface
} from "@nut-tree/provider-interfaces";

describe("DefaultProviderRegistry", () => {
  describe("non-defaults", () => {
    it("should not have a default ImageFinder registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getImageFinder).toThrowError(
        /.*Error: No ImageFinder registered/
      );
    });

    it("should not have a default TextFinder registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getTextFinder).toThrowError(
        /.*Error: No TextFinder registered/
      );
    });

    it("should not have a default WindowFinder registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getWindowFinder).toThrowError(
        /.*Error: No WindowFinder registered/
      );
    });
  });

  describe("defaults", () => {
    it("should have a default ImageProcessor registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getImageProcessor).not.toThrowError();
    });
    it("should have a default ImageWriter registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getImageWriter).not.toThrowError();
    });
    it("should have a default ImageReader registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getImageReader).not.toThrowError();
    });
    it("should have a default Clipboard registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getClipboard).not.toThrowError();
    });
    it("should have a default Keyboard registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getKeyboard).not.toThrowError();
    });
    it("should have a default Mouse registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getMouse).not.toThrowError();
    });
    it("should have a default Screen registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getScreen).not.toThrowError();
    });
    it("should have a default WindowProvider registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getWindow).not.toThrowError();
    });
    it("should have a default LogProvider registered", () => {
      // GIVEN

      // WHEN

      // THEN
      expect(providerRegistry.getLogProvider).not.toThrowError();
    });
  });
  describe("resets", () => {
    it("should throw on missing ImageProcessor", () => {
      // GIVEN

      // WHEN
      providerRegistry.registerImageProcessor(
        undefined as unknown as ImageProcessor
      );

      // THEN
      expect(providerRegistry.getImageProcessor).toThrowError();
    });
    it("should throw on missing ImageWriter", () => {
      // GIVEN

      // WHEN
      providerRegistry.registerImageWriter(undefined as unknown as ImageWriter);

      // THEN
      expect(providerRegistry.getImageWriter).toThrowError();
    });
    it("should throw on missing ImageReader", () => {
      // GIVEN

      // WHEN
      providerRegistry.registerImageReader(undefined as unknown as ImageReader);

      // THEN
      expect(providerRegistry.getImageReader).toThrowError();
    });
    it("should throw on missing Clipboard", () => {
      // GIVEN

      // WHEN
      providerRegistry.registerClipboardProvider(
        undefined as unknown as ClipboardProviderInterface
      );

      // THEN
      expect(providerRegistry.getClipboard).toThrowError();
    });
    it("should throw on missing Keyboard", () => {
      // GIVEN

      // WHEN
      providerRegistry.registerKeyboardProvider(
        undefined as unknown as KeyboardProviderInterface
      );

      // THEN
      expect(providerRegistry.getKeyboard).toThrowError();
    });
    it("should throw on missing Mouse", () => {
      // GIVEN

      // WHEN
      providerRegistry.registerMouseProvider(
        undefined as unknown as MouseProviderInterface
      );

      // THEN
      expect(providerRegistry.getMouse).toThrowError();
    });
    it("should throw on missing Screen", () => {
      // GIVEN

      // WHEN
      providerRegistry.registerScreenProvider(
        undefined as unknown as ScreenProviderInterface
      );

      // THEN
      expect(providerRegistry.getScreen).toThrowError();
    });
    it("should throw on missing Window", () => {
      // GIVEN

      // WHEN
      providerRegistry.registerWindowProvider(
        undefined as unknown as WindowProviderInterface
      );

      // THEN
      expect(providerRegistry.getWindow).toThrowError();
    });
  });
});
