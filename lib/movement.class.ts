import { NativeAdapter } from "./adapter/native.adapter.class";
import { Point } from "./point.class";
import { LineHelper } from "./util/linehelper.class";

export class Movement {
  constructor(private native: NativeAdapter, private lineHelper: LineHelper) {
  }

  public async straightTo(target: Point): Promise<Point[]> {
    const origin = await this.getPosition();
    return this.lineHelper.straightLine(origin, target);
  }

  public async down(px: number): Promise<Point[]> {
    const pos = await this.getPosition();
    return this.straightTo(new Point(pos.x, pos.y + px));
  }

  public async up(px: number): Promise<Point[]> {
    const pos = await this.getPosition();
    return this.straightTo(new Point(pos.x, pos.y - px));
  }

  public async left(px: number): Promise<Point[]> {
    const pos = await this.getPosition();
    return this.straightTo(new Point(pos.x - px, pos.y));
  }

  public async right(px: number): Promise<Point[]> {
    const pos = await this.getPosition();
    return this.straightTo(new Point(pos.x + px, pos.y));
  }

  private async getPosition(): Promise<Point> {
    const pos = await this.native.currentMousePosition();
    return new Point(pos.x, pos.y);
  }
}
