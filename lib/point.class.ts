export class Point {
  constructor(public x: number, public y: number) {}

  public toString() {
    return `(${this.x}, ${this.y})`;
  }
}
