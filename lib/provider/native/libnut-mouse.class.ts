import libnut = require("@nut-tree/libnut");
import {Button} from "../../button.enum";
import {Point} from "../../point.class";
import {MouseProviderInterface} from "../mouse-provider.interface";

export default class MouseAction implements MouseProviderInterface {
    public static buttonLookup(btn: Button): any {
        return this.ButtonLookupMap.get(btn);
    }

    private static ButtonLookupMap: Map<Button, string> = new Map<Button, string>(
        [[Button.LEFT, "left"], [Button.MIDDLE, "middle"], [Button.RIGHT, "right"]],
    );

    constructor() {
    }

    public setMouseDelay(delay: number): void {
        libnut.setMouseDelay(delay);
    }

    public setMousePosition(p: Point): Promise<void> {
        return new Promise<void>(((resolve, reject) => {
            try {
                if (p?.x && p?.y) {
                    libnut.moveMouse(p.x, p.y);
                    resolve();
                } else {
                    reject(`setMousePosition received invalid point: ${JSON.stringify(p)}`);
                }
            } catch (e) {
                reject(e);
            }
        }));
    }

    public currentMousePosition(): Promise<Point> {
        return new Promise<Point>(((resolve, reject) => {
            try {
                const position = libnut.getMousePos();
                resolve(new Point(position.x, position.y));
            } catch (e) {
                reject(e);
            }
        }));
    }

    public leftClick(): Promise<void> {
        return new Promise<void>(((resolve, reject) => {
            try {
                libnut.mouseClick(MouseAction.buttonLookup(Button.LEFT));
                resolve();
            } catch (e) {
                reject(e);
            }
        }));
    }

    public rightClick(): Promise<void> {
        return new Promise<void>(((resolve, reject) => {
            try {
                libnut.mouseClick(MouseAction.buttonLookup(Button.RIGHT));
                resolve();
            } catch (e) {
                reject(e);
            }
        }));
    }

    public middleClick(): Promise<void> {
        return new Promise<void>(((resolve, reject) => {
            try {
                libnut.mouseClick(MouseAction.buttonLookup(Button.MIDDLE));
                resolve();
            } catch (e) {
                reject(e);
            }
        }));
    }

    public pressButton(btn: Button): Promise<void> {
        return new Promise<void>(((resolve, reject) => {
            try {
                const mouseButton = MouseAction.buttonLookup(btn)
                if (mouseButton) {
                    libnut.mouseToggle("down", mouseButton);
                    resolve();
                } else {
                    reject(`pressButton received invalid button. Button: ${JSON.stringify(btn)}`)
                }
            } catch (e) {
                reject(e);
            }
        }));
    }

    public releaseButton(btn: Button): Promise<void> {
        return new Promise<void>(((resolve, reject) => {
            try {
                const mouseButton = MouseAction.buttonLookup(btn)
                if (mouseButton) {
                    libnut.mouseToggle("up", mouseButton);
                    resolve();
                } else {
                    reject(`releaseButton received invalid button. Button: ${JSON.stringify(btn)}`)
                }
            } catch (e) {
                reject(e);
            }
        }));
    }

    public scrollUp(amount: number): Promise<void> {
        return new Promise<void>(((resolve, reject) => {
            try {
                if (amount >= 0) {
                    libnut.scrollMouse(0, amount);
                    resolve();
                } else {
                    reject(`scrollUp received negative input: ${amount}`)
                }
            } catch (e) {
                reject(e);
            }
        }));
    }

    public scrollDown(amount: number): Promise<void> {
        return new Promise<void>(((resolve, reject) => {
            try {
                if (amount >= 0) {
                    libnut.scrollMouse(0, -amount);
                    resolve();
                } else {
                    reject(`scrollDown received negative input: ${amount}`)
                }
            } catch (e) {
                reject(e);
            }
        }));
    }

    public scrollLeft(amount: number): Promise<void> {
        return new Promise<void>(((resolve, reject) => {
            try {
                if (amount >= 0) {
                    libnut.scrollMouse(-amount, 0);
                    resolve();
                } else {
                    reject(`scrollLeft received negative input: ${amount}`)
                }
            } catch (e) {
                reject(e);
            }
        }));
    }

    public scrollRight(amount: number): Promise<void> {
        return new Promise<void>(((resolve, reject) => {
            try {
                if (amount >= 0) {
                    libnut.scrollMouse(amount, 0);
                    resolve();
                } else {
                    reject(`scrollRight received negative input: ${amount}`)
                }
            } catch (e) {
                reject(e);
            }
        }));
    }
}
