import robot = require("robot-js");
import {Button} from "../../button.enum";
import {Image} from "../../image.class";
import {Key} from "../../key.enum";
import {Point} from "../../point.class";
import {Region} from "../../region.class";
import {INativeProviderInterface} from "./INativeProviderInterface";

export class RobotJsNativeProvider implements INativeProviderInterface {
    public static keyLookup(key: Key): any {
        return this.KeyLookupMap.get(key);
    }

    public static buttonLookup(btn: Button): any {
        return this.ButtonLookupMap.get(btn);
    }

    private static ButtonLookupMap = new Map<Button, any>([
        [Button.LEFT, robot.BUTTON_LEFT],
        [Button.MIDDLE, robot.BUTTON_MIDDLE],
        [Button.RIGHT, robot.BUTTON_RIGHT],
    ]);

    private static KeyLookupMap = new Map<Key, any>([
        [Key.A, robot.KEY_A],
        [Key.B, robot.KEY_B],
        [Key.C, robot.KEY_C],
        [Key.D, robot.KEY_D],
        [Key.E, robot.KEY_E],
        [Key.F, robot.KEY_F],
        [Key.G, robot.KEY_G],
        [Key.H, robot.KEY_H],
        [Key.I, robot.KEY_I],
        [Key.J, robot.KEY_J],
        [Key.K, robot.KEY_K],
        [Key.L, robot.KEY_L],
        [Key.M, robot.KEY_M],
        [Key.N, robot.KEY_N],
        [Key.O, robot.KEY_O],
        [Key.P, robot.KEY_P],
        [Key.Q, robot.KEY_Q],
        [Key.R, robot.KEY_R],
        [Key.S, robot.KEY_S],
        [Key.T, robot.KEY_T],
        [Key.U, robot.KEY_U],
        [Key.V, robot.KEY_V],
        [Key.W, robot.KEY_W],
        [Key.X, robot.KEY_X],
        [Key.Y, robot.KEY_Y],
        [Key.Z, robot.KEY_Z],

        [Key.F1, robot.KEY_F1],
        [Key.F2, robot.KEY_F2],
        [Key.F3, robot.KEY_F3],
        [Key.F4, robot.KEY_F4],
        [Key.F5, robot.KEY_F5],
        [Key.F6, robot.KEY_F6],
        [Key.F7, robot.KEY_F7],
        [Key.F8, robot.KEY_F8],
        [Key.F9, robot.KEY_F9],
        [Key.F10, robot.KEY_F10],
        [Key.F11, robot.KEY_F11],
        [Key.F12, robot.KEY_F12],

        [Key.Num0, robot.KEY_0],
        [Key.Num1, robot.KEY_1],
        [Key.Num2, robot.KEY_2],
        [Key.Num3, robot.KEY_3],
        [Key.Num4, robot.KEY_4],
        [Key.Num5, robot.KEY_5],
        [Key.Num6, robot.KEY_6],
        [Key.Num7, robot.KEY_7],
        [Key.Num8, robot.KEY_8],
        [Key.Num9, robot.KEY_9],
        [Key.NumPad0, robot.KEY_NUM0],
        [Key.NumPad1, robot.KEY_NUM1],
        [Key.NumPad2, robot.KEY_NUM2],
        [Key.NumPad3, robot.KEY_NUM3],
        [Key.NumPad4, robot.KEY_NUM4],
        [Key.NumPad5, robot.KEY_NUM5],
        [Key.NumPad6, robot.KEY_NUM6],
        [Key.NumPad7, robot.KEY_NUM7],
        [Key.NumPad8, robot.KEY_NUM8],
        [Key.NumPad9, robot.KEY_NUM9],

        [Key.Space, robot.KEY_SPACE],
        [Key.Escape, robot.KEY_ESCAPE],
        [Key.Tab, robot.KEY_TAB],
        [Key.LeftAlt, robot.KEY_LALT],
        [Key.LeftControl, robot.KEY_LCONTROL],
        [Key.RightAlt, robot.KEY_RALT],
        [Key.RightControl, robot.KEY_RCONTROL],

        [Key.LeftShift, robot.KEY_LSHIFT],
        [Key.LeftSuper, robot.KEY_LSYSTEM],
        [Key.RightShift, robot.KEY_RSHIFT],
        [Key.RightSuper, robot.KEY_RSYSTEM],

        [Key.Grave, robot.KEY_GRAVE],
        [Key.Minus, robot.KEY_MINUS],
        [Key.Equal, robot.KEY_EQUAL],
        [Key.Backspace, robot.KEY_BACKSPACE],
        [Key.LeftBracket, robot.KEY_LBRACKET],
        [Key.RightBracket, robot.KEY_RBRACKET],
        [Key.Backslash, robot.KEY_BACKSLASH],
        [Key.Semicolon, robot.KEY_SEMICOLON],
        [Key.Quote, robot.KEY_QUOTE],
        [Key.Return, robot.KEY_RETURN],
        [Key.Comma, robot.KEY_COMMA],
        [Key.Period, robot.KEY_PERIOD],
        [Key.Slash, robot.KEY_SLASH],

        [Key.Left, robot.KEY_LEFT],
        [Key.Up, robot.KEY_UP],
        [Key.Right, robot.KEY_RIGHT],
        [Key.Down, robot.KEY_DOWN],

        [Key.Print, robot.KEY_PRINT],
        [Key.Pause, robot.KEY_PAUSE],
        [Key.Insert, robot.KEY_INSERT],
        [Key.Delete, robot.KEY_DELETE],
        [Key.Home, robot.KEY_HOME],
        [Key.End, robot.KEY_END],
        [Key.PageUp, robot.KEY_PAGEUP],
        [Key.PageDown, robot.KEY_PAGEDOWN],

        [Key.Add, robot.KEY_ADD],
        [Key.Subtract, robot.KEY_SUBTRACT],
        [Key.Multiply, robot.KEY_MULTIPLY],
        [Key.Divide, robot.KEY_DIVIDE],
        [Key.Decimal, robot.KEY_DECIMAL],
        [Key.Enter, robot.KEY_ENTER],

        [Key.CapsLock, robot.KEY_CAPSLOCK],
        [Key.ScrollLock, robot.KEY_SCROLLLOCK],
        [Key.NumLock, robot.KEY_NUMLOCK],
    ]);

    private clipboard: any;
    private keyboard: any;
    private mouse: any;

    constructor() {
        this.clipboard = robot.Clipboard;
        this.keyboard = robot.Keyboard();
        this.mouse = robot.Mouse();
        robot.Screen.synchronize();
    }

    public grabScreen(): Promise<Image> {
        return new Promise(((resolve, reject) => {
            if (robot.Screen.synchronize()) {
                const img = new robot.Image();
                const mainScreen = robot.Screen.getMain();
                robot.Screen.grabScreen(img, mainScreen.getBounds());
                resolve(new Image(
                    img.getWidth(),
                    img.getHeight(),
                    img.getData(),
                ));
            }
            reject("Unable to fetch screen content.");
        }));
    }

    public grabScreenRegion(region: Region): Promise<Image> {
        return new Promise(((resolve, reject) => {
            if (robot.Screen.synchronize()) {
                const bounds = new robot.Bounds(
                    region.left,
                    region.top,
                    region.width,
                    region.height,
                );
                if (bounds !== undefined) {
                    const img = new robot.Image();
                    robot.Screen.grabScreen(img, bounds);
                    resolve(new Image(
                        img.getWidth(),
                        img.getHeight(),
                        img.getData(),
                    ));
                }
                resolve(this.grabScreen());
            }
            reject("Unable to fetch screen content.");
        }));
    }

    public setMouseDelay(delay: number): void {
        this.mouse.autoDelay.min = delay;
        this.mouse.autoDelay.max = delay;
    }

    public setMousePosition(p: Point): void {
        robot.Mouse.setPos(p.x, p.y);
    }

    public currentMousePosition(): Point {
        const robotPoint = robot.Mouse.getPos();
        return new Point(robotPoint.x, robotPoint.y);
    }

    public screenWidth(): number {
        const mainScreenBounds = robot.Screen.getMain().getBounds();
        return mainScreenBounds.getRight() - mainScreenBounds.getLeft();
    }

    public screenHeight(): number {
        const mainScreenBounds = robot.Screen.getMain().getBounds();
        return mainScreenBounds.getBottom() - mainScreenBounds.getTop();
    }

    public screenSize(): Region {
        const mainScreenBounds = robot.Screen.getMain().getBounds();
        return new Region(0, 0, mainScreenBounds.getRight(), mainScreenBounds.getBottom());
    }

    public leftClick(): void {
        this.mouse.click(robot.BUTTON_LEFT);
    }

    public rightClick(): void {
        this.mouse.click(robot.BUTTON_RIGHT);
    }

    public pressButton(btn: Button): void {
        this.mouse.press(RobotJsNativeProvider.buttonLookup(btn));
    }

    public releaseButton(btn: Button): void {
        this.mouse.release(RobotJsNativeProvider.buttonLookup(btn));
    }

    public type(input: string): void {
        this.keyboard.click(input);
    }

    public click(key: Key): void {
        const nativeKey = RobotJsNativeProvider.keyLookup(key);
        this.keyboard.press(nativeKey);
        this.keyboard.release(nativeKey);
    }

    public pressKey(key: Key): void {
        this.keyboard.press(RobotJsNativeProvider.keyLookup(key));
    }

    public releaseKey(key: Key): void {
        this.keyboard.release(RobotJsNativeProvider.keyLookup(key));
    }

    public scrollUp(amount: number): void {
        this.mouse.scrollV(amount);
    }

    public scrollDown(amount: number): void {
        this.mouse.scrollV(-amount);
    }

    public scrollLeft(amount: number): void {
        this.mouse.scrollV(-amount);
    }

    public scrollRight(amount: number): void {
        this.mouse.scrollV(amount);
    }

    public copy(text: string): void {
        this.clipboard.setText(text);
    }

    public paste(): string {
        return this.clipboard.getText();
    }

}
