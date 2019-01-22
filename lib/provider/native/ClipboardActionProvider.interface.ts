export interface ClipboardActionProvider {
  hasText(): boolean;
  clear(): boolean;
  copy(text: string): void;
  paste(): string;
}
