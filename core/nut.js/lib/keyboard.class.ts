import { Key } from "@nut-tree/shared";
import { sleep } from "./sleep.function";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";

type StringOrKey = string[] | Key[];

const inputIsString = (input: (string | Key)[]): input is string[] => {
  return input.every((elem: string | Key) => typeof elem === "string");
};

/**
 * Config object for {@link KeyboardClass} class
 */
export interface KeyboardConfig {
  /**
   * Configures the delay between single key events
   */
  autoDelayMs: number;
}

/**
 * {@link KeyboardClass} class provides methods to emulate keyboard input
 */
export class KeyboardClass {
  /**
   * Config object for {@link KeyboardClass} class
   */
  public config: KeyboardConfig = {
    autoDelayMs: 300
  };

  /**
   * {@link KeyboardClass} class constructor
   * @param providerRegistry
   */
  constructor(private providerRegistry: ProviderRegistry) {
    if (this.providerRegistry.hasKeyboard()) {
      this.providerRegistry
        .getKeyboard()
        .setKeyboardDelay(this.config.autoDelayMs);
    }
  }

  /**
   * {@link type} types a sequence of {@link String} or single {@link Key}s via system keyboard
   * @example
   * ```typescript
   *    await keyboard.type(Key.A, Key.S, Key.D, Key.F);
   *    await keyboard.type("Hello, world!");
   * ```
   *
   * @param input Sequence of {@link String} or {@link Key} to type
   */
  public async type(...input: StringOrKey): Promise<KeyboardClass> {
    try {
      if (inputIsString(input)) {
        for (const char of input.join(" ")) {
          await sleep(this.config.autoDelayMs);
          await this.providerRegistry.getKeyboard().type(char);
          this.providerRegistry.getLogProvider().debug(`Tapped ${char}`);
        }
        this.providerRegistry.getLogProvider().info(`Typed string ${input}`);
      } else {
        await this.providerRegistry.getKeyboard().click(...(input as Key[]));
        const key = input[input.length - 1];
        const modifiers = input.slice(0, -1);
        const keyName = Key[key];
        const modifierNames = modifiers.map((modifier) => Key[modifier]);
        this.providerRegistry
          .getLogProvider()
          .info(`Tapped key ${keyName} with modifiers ${modifierNames}`);
      }
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link pressKey} presses and holds a single {@link Key} for {@link Key} combinations
   * Modifier {@link Key}s are to be given in "natural" ordering, so first modifier {@link Key}s, followed by the {@link Key} to press
   * @example
   * ```typescript
   *    // Will press and hold key combination STRG + V
   *    await keyboard.pressKey(Key.STRG, Key.V);
   * ```
   *
   * @param keys Array of {@link Key}s to press and hold
   */
  public async pressKey(...keys: Key[]): Promise<KeyboardClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getKeyboard().pressKey(...keys);
      const keyNames = keys.map((key) => Key[key]);
      this.providerRegistry.getLogProvider().info(`Pressed keys ${keyNames}`);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }

  /**
   * {@link pressKey} releases a single {@link Key} for {@link Key} combinations
   * Modifier {@link Key}s are to be given in "natural" ordering, so first modifier {@link Key}s, followed by the {@link Key} to press
   * @example
   * ```typescript
   *    // Will release key combination STRG + V
   *    await keyboard.releaseKey(Key.STRG, Key.V);
   * ```
   *
   * @param keys Array of {@link Key}s to release
   */
  public async releaseKey(...keys: Key[]): Promise<KeyboardClass> {
    try {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getKeyboard().releaseKey(...keys);
      const keyNames = keys.map((key) => Key[key]);
      this.providerRegistry.getLogProvider().info(`Released keys ${keyNames}`);
      return this;
    } catch (e) {
      this.providerRegistry.getLogProvider().error(e as Error);
      throw e;
    }
  }
}
