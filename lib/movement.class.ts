import { NativeAdapter } from "./adapter/native.adapter.class";
import { Point } from "./point.class";
import { LineHelper } from "./util/linehelper.class";

export class Movement {
  constructor(private native: NativeAdapter, private lineHelper: LineHelper) {
  }

  public straightTo(target: Point): Point[] {
    const origin = this.getPosition();
    return this.lineHelper.straightLine(origin, target);
  }

  public down(px: number): Point[] {
    const pos = this.getPosition();
    return this.straightTo(new Point(pos.x, pos.y + px));
  }

  public up(px: number): Point[] {
    const pos = this.getPosition();
    return this.straightTo(new Point(pos.x, pos.y - px));
  }

  public left(px: number): Point[] {
    const pos = this.getPosition();
    return this.straightTo(new Point(pos.x - px, pos.y));
  }

  public right(px: number): Point[] {
    const pos = this.getPosition();
    return this.straightTo(new Point(pos.x + px, pos.y));
  }

  private getPosition(): Point {
    const pos = this.native.currentMousePosition();
    return new Point(pos.x, pos.y);
  }
}
