export class Region {
  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number
  ) {}

  public area() {
    return this.width * this.height;
  }

  public toString() {
    return `(${this.left}, ${this.top}, ${this.width}, ${this.height})`;
  }
}

const testRegion = new Region(0, 0, 100, 100);
const regionKeys = Object.keys(testRegion);

export function isRegion(possibleRegion: any): possibleRegion is Region {
  if (typeof possibleRegion !== "object") {
    return false;
  }
  for (const key of regionKeys) {
    if (!(key in possibleRegion)) {
      return false;
    }
    const possibleRegionKeyType = typeof possibleRegion[key];
    const regionKeyType = typeof testRegion[key as keyof typeof testRegion];
    if (possibleRegionKeyType !== regionKeyType) {
      return false;
    }
  }
  return true;
}
