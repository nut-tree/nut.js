import { Point } from "./point.class";
import { Region } from "./region.class";

export const centerOf = async (target: Region | Promise<Region>): Promise<Point> => {
  const targetRegion = await target;
  const x = Math.floor(targetRegion.left + targetRegion.width / 2);
  const y = Math.floor(targetRegion.top + targetRegion.height / 2);

  return new Point(x, y);
};

export const randomPointIn = async (target: Region | Promise<Region>): Promise<Point> => {
  const targetRegion = await target;
  const x = Math.floor(targetRegion.left + Math.random() * targetRegion.width);
  const y = Math.floor(targetRegion.top + Math.random() * targetRegion.height);

  return new Point(x, y);
};
