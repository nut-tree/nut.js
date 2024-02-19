import { isRegion, Point, Region } from "@nut-tree/shared";

/**
 * {@link centerOf} returns the center {@link Point} for a given {@link Region}
 * @param target {@link Region} to determine the center {@link Point} for
 */
export const centerOf = async (
  target: Region | Promise<Region>
): Promise<Point> => {
  const targetRegion = await target;
  if (!isRegion(targetRegion)) {
    throw Error(
      `centerOf requires a Region, but received ${JSON.stringify(targetRegion)}`
    );
  }
  const x = Math.floor(targetRegion.left + targetRegion.width / 2);
  const y = Math.floor(targetRegion.top + targetRegion.height / 2);

  return new Point(x, y);
};

/**
 * {@link randomPointIn} returns a random {@link Point} within a given {@link Region}
 * @param target {@link Region} the random {@link Point} has to be within
 */
export const randomPointIn = async (
  target: Region | Promise<Region>
): Promise<Point> => {
  const targetRegion = await target;
  if (!isRegion(targetRegion)) {
    throw Error(
      `randomPointIn requires a Region, but received ${JSON.stringify(
        targetRegion
      )}`
    );
  }
  const x = Math.floor(targetRegion.left + Math.random() * targetRegion.width);
  const y = Math.floor(targetRegion.top + Math.random() * targetRegion.height);

  return new Point(x, y);
};
