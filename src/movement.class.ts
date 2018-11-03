import {Point} from "./point.class";
import {LineHelper} from "./util/linehelper.class";
import {NativeAdapter} from "./adapter/native.adapter.class";


export class Movement {
    constructor(private native: NativeAdapter, private lineHelper: LineHelper) {
    }

    private getPosition(): Point {
        const pos = this.native.currentMousePosition();
        return new Point(pos.x, pos.y);
    }

    straightTo(target: Point): Point[] {
        const origin = this.getPosition();
        return this.lineHelper.straightLine(origin, target);
    }

    down(px: number): Point[] {
        const pos = this.getPosition();
        return this.straightTo(new Point(pos.x, pos.y + px));
    }

    up(px: number): Point[] {
        const pos = this.getPosition();
        return this.straightTo(new Point(pos.x, pos.y - px));
    }

    left(px: number): Point[] {
        const pos = this.getPosition();
        return this.straightTo(new Point(pos.x - px, pos.y));
    }

    right(px: number): Point[] {
        const pos = this.getPosition();
        return this.straightTo(new Point(pos.x + px, pos.y));
    }
}
