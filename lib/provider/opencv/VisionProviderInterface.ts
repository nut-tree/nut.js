import { Image } from "../../image.class";
import { MatchResult } from "../../matchresult.class";
import { Region } from "../../region.class";

export interface VisionProviderInterface {
  loadImage(path: string): any;
  loadImageWithAlphaChannel(path: string): any;
  loadImageWithoutAlphaChannel(path: string): any;
  findMatch(needle: any, haystack: any): Promise<MatchResult>;
  fromImageWithAlphaChannel(img: Image, roi?: Region): Promise<any>;
  fromImageWithoutAlphaChannel(img: Image, roi?: Region): Promise<any>;
  rgbToGrayScale(img: any): Promise<any>;
}
