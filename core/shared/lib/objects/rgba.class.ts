export class RGBA {
  constructor(
    public readonly R: number,
    public readonly G: number,
    public readonly B: number,
    public readonly A: number
  ) {
  }

  public toString(): string {
    return `rgba(${this.R},${this.G},${this.B},${this.A})`;
  }

  public toHex(): string {
    return `#${this.R.toString(16).padStart(2, "0")}${this.G.toString(
      16
    ).padStart(2, "0")}${this.B.toString(16).padStart(2, "0")}${this.A.toString(
      16
    ).padStart(2, "0")}`;
  }
}
