import {Button} from "../../button.enum";
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

    scrollUp(amount: number): void;

    scrollDown(amount: number): void;

    scrollLeft(amount: number): void;

    scrollRight(amount: number): void;

    pressButton(btn: Button): void;

    releaseButton(btn: Button): void;

    type(input: string): void;

    click(key: Key): void;

    pressKey(key: Key): void;

    releaseKey(key: Key): void;
}
