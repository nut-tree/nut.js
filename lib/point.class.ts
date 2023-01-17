export class Point {
  constructor(public x: number, public y: number) {}

  public toString() {
    return `(${this.x}, ${this.y})`;
  }
}

const testPoint = new Point(100, 100);
const pointKeys = Object.keys(testPoint);

export function isPoint(possiblePoint: any): possiblePoint is Point {
  if (typeof possiblePoint !== "object") {
    return false;
  }
  for (const key of pointKeys) {
    if (!(key in possiblePoint)) {
      return false;
    }
    const possiblePointKeyType = typeof possiblePoint[key];
    const pointKeyType = typeof testPoint[key as keyof typeof testPoint];
    if (possiblePointKeyType !== pointKeyType) {
      return false;
    }
  }
  return true;
}
