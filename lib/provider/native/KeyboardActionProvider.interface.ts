import { Key } from "../../key.enum";

export interface KeyboardActionProvider {
  type(input: string): void;
  click(key: Key): void;
  pressKey(key: Key): void;
  releaseKey(key: Key): void;
}
