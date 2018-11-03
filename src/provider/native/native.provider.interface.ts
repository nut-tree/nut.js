import {Region} from "../../region.class";
import {Point} from "../../point.class";
import {Image} from "../../image.class";

export interface NativeProviderInterface {
    grabScreen(): Promise<Image>;
    grabScreenRegion(region: Region): Promise<Image>;
    setMouseDelay(delay: number): void;
    setMousePosition(p: Point): void;
    currentMousePosition(): Point;
    screenWidth(): number;
    screenHeight(): number;
    screenSize(): Region;
    leftClick(): void;
    rightClick(): void;
}