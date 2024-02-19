/**
 * {@link ClipboardClass} class gives access to a systems clipboard
 */
import { ProviderRegistry } from "@nut-tree/provider-interfaces";

export class ClipboardClass {
  /**
   * {@link ClipboardClass} class constructor
   * @param providerRegistry
   */
  constructor(private providerRegistry: ProviderRegistry) {
  }

  /**
   * {@link setContent} copies a given text to the system clipboard
   * @param text The text to copy
   */
  public async setContent(text: string): Promise<void> {
    await this.providerRegistry.getClipboard().copy(text);
    this.providerRegistry.getLogProvider().debug(`Saved to clipboard`);
  }

  /**
   * {@link getContent} returns the current content of the system clipboard (limited to text)
   */
  public async getContent(): Promise<string> {
    const content = await this.providerRegistry.getClipboard().paste();
    this.providerRegistry.getLogProvider().debug(`Fetched clipboard content`);
    return content;
  }
}
