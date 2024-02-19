import { Image } from "../objects/image.class";
import { ColorQuery, TextQuery, WindowQuery } from "../objects/query.class";
import { Region } from "../objects/region.class";
import { Point } from "../objects/point.class";
import { WindowInterface } from "../objects/window.interface";

export type RegionResultFindInput = Image | TextQuery;
export type PointResultFindInput = ColorQuery;
export type WindowResultFindInput = WindowQuery;
export type FindInput =
  | RegionResultFindInput
  | WindowResultFindInput
  | PointResultFindInput;
export type FindResult = Region | Point | WindowInterface;
