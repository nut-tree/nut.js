import {Image} from "../../image.class";
import {Key} from "../../key.enum";
import {Point} from "../../point.class";
import {Region} from "../../region.class";

export interface INativeProviderInterface {
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
    type(input: string | Key): void;
    press(key: Key): void;
    release(key: Key): void;
}
