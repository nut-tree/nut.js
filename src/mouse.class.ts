import {MovementType} from "./movementtype.class";
import {Point} from "./point.class";
import {NativeAdapter} from "./adapter/native.adapter.class";
import {Config} from "./nut";

export class Mouse {
    constructor(private config: Config, private native: NativeAdapter) {
    }

    setDelay(delay: number): void {
        this.native.setMouseDelay(delay);
    }

    setPosition(target: Point): void {
        this.native.setMousePosition(target);
    }

    move(path: Point[], movementType = MovementType.linear): void {
        const timeSteps = movementType(path.length, this.config.mouseSpeed);
        for (let idx = 0; idx < path.length; ++idx) {
            const node = path[idx];
            const minTime = timeSteps[idx];
            let previous = Date.now();
            let current = Date.now();
            while (current - previous < minTime) {
                current = Date.now();
            }
            this.native.setMousePosition(node);
        }
    }

    leftClick() {
        this.native.leftClick();
    }

    rightClick() {
        this.native.rightClick();
    }
}
