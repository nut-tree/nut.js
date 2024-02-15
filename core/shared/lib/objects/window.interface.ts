import { Region } from "./region.class";
import { Point } from "./point.class";
import { Size } from "./size.class";

export interface WindowInterface {
  getTitle(): Promise<string>;

  getRegion(): Promise<Region>;

  move(newOrigin: Point): Promise<boolean>;

  resize(newSize: Size): Promise<boolean>;

  focus(): Promise<boolean>;
}