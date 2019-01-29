import robot = require("robot-js");
import { ClipboardActionProvider } from "./clipboard-action-provider.interface";

export class RobotClipboardAction implements ClipboardActionProvider {
  private clipboard: any;

  constructor() {
    this.clipboard = robot.Clipboard;
  }

  public copy(text: string): void {
    this.clipboard.setText(text);
  }

  public paste(): string {
    return this.clipboard.getText();
  }

  public hasText(): boolean {
    return this.clipboard.hasText();
  }
  public clear(): boolean {
    return this.clipboard.clear();
  }
}
