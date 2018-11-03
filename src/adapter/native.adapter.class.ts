import {Region} from "../region.class";
import {NativeProviderInterface} from "../provider/native/native.provider.interface";
import {Point} from "../point.class";
import {Image} from "../image.class";

export class NativeAdapter {
    constructor(private native: NativeProviderInterface) {
    }

    grabScreen(): Promise<Image> {
        return this.native.grabScreen();
    }

    grabScreenRegion(region: Region): Promise<Image> {
        return this.native.grabScreenRegion(region);
    }

    setMouseDelay(delay: number): void {
        this.native.setMouseDelay(delay);
    }

    setMousePosition(p: Point): void {
        this.native.setMousePosition(p);
    }

    currentMousePosition(): Point {
        return this.native.currentMousePosition();
    }

    screenWidth(): number {
        return this.native.screenWidth();
    }

    screenHeight(): number {
        return this.native.screenHeight();
    }

    screenSize(): Region {
        return this.native.screenSize()
    }

    leftClick(): void {
        this.native.leftClick();
    }

    rightClick(): void {
        this.native.rightClick();
    }
}
