import { Region } from "@nut-tree/shared";

export interface WindowElement {
  type?: string;
  region?: Region;
  title?: string;
  value?: string;
  isFocused?: boolean;
  selectedText?: string;
  isEnabled?: boolean;
  role?: string;
  subRole?: string;
  children?: WindowElement[]
}