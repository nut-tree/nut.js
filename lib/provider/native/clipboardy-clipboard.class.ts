import clippy from "clipboardy";
import { ClipboardProvider } from "../clipboard-provider.interface";

export default class implements ClipboardProvider {
  constructor() {
  }

  public async hasText(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const content = clippy.readSync();
        resolve(content.length > 0);
      } catch (e) {
        reject(e);
      }
    });
  }

  public clear(): Promise<boolean> {
    return Promise.reject("Method not implemented.");
  }

  public async copy(text: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        clippy.writeSync(text);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public async paste(): Promise<string> {
    return clippy.read();
  }
}
