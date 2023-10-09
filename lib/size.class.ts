export class Size {
  constructor(
    public width: number,
    public height: number,
  ) {}

  public area() {
    return this.width * this.height;
  }

  public toString() {
    return `(${this.width}x${this.height})`;
  }
}

const testSize = new Size(100, 100);
const sizeKeys = Object.keys(testSize);
export function isSize(possibleSize: any): possibleSize is Size {
  if (typeof possibleSize !== "object") {
    return false;
  }
  for (const key of sizeKeys) {
    if (!(key in possibleSize)) {
      return false;
    }
    const possibleSizeKeyType = typeof possibleSize[key];
    const sizeKeyType = typeof testSize[key as keyof typeof testSize];
    if (possibleSizeKeyType !== sizeKeyType) {
      return false;
    }
  }
  return true;
}
