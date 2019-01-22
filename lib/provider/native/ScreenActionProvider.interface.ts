import { Image } from "../../image.class";
import { Region } from "../../region.class";

export interface ScreenActionProvider {
  grabScreen(): Promise<Image>;
  grabScreenRegion(region: Region): Promise<Image>;
  screenWidth(): number;
  screenHeight(): number;
  screenSize(): Region;
}
