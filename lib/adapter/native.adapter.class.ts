import {Button} from "../button.enum";
import {Key} from "../key.enum";
import {Point} from "../point.class";
import {Region} from "../region.class";
import {ProviderRegistry} from "../provider/provider-registry.class";

/**
 * {@link NativeAdapter} serves as an abstraction layer for all OS level interactions.
 *
 * This allows to provide a high level interface for native actions,
 * without having to spread (possibly) multiple dependencies all over the code.
 * All actions which involve the OS are bundled in this adapter.
 */
export class NativeAdapter {
    /**
     * {@link NativeAdapter} class constructor
     * @param registry: {@link ProviderRegistry} to access providers
     */
    constructor(
        private registry: ProviderRegistry
    ) {
    }

    /**
     * {@link setMouseDelay} configures mouse speed for movement
     *
     * @param delay Mouse delay in milliseconds
     */
    public setMouseDelay(delay: number): void {
        this.registry.getMouse().setMouseDelay(delay);
    }

    /**
     * {@link setKeyboardDelay} configures keyboard delay between key presses
     *
     * @param delay The keyboard delay in milliseconds
     */
    public setKeyboardDelay(delay: number): void {
        this.registry.getKeyboard().setKeyboardDelay(delay);
    }

    /**
     * {@link setMousePosition} changes the current mouse cursor position to a given {@link Point}
     *
     * @param p The new cursor position at {@link Point} p
     */
    public setMousePosition(p: Point): Promise<void> {
        return this.registry.getMouse().setMousePosition(p);
    }

    /**
     * {@link currentMousePosition} returns the current mouse position
     *
     * @returns Current cursor position at a certain {@link Point}
     */
    public currentMousePosition(): Promise<Point> {
        return this.registry.getMouse().currentMousePosition();
    }

    /**
     * {@link leftClick} triggers a native left-click event via OS API
     */
    public leftClick(): Promise<void> {
        return this.registry.getMouse().leftClick();
    }

    /**
     * {@link rightClick} triggers a native right-click event via OS API
     */
    public rightClick(): Promise<void> {
        return this.registry.getMouse().rightClick();
    }

    /**
     * {@link middleClick} triggers a native middle-click event via OS API
     */
    public middleClick(): Promise<void> {
        return this.registry.getMouse().middleClick();
    }

    /**
     * {@link pressButton} presses and holds a mouse {@link Button}
     *
     * @param btn The mouse {@link Button} to press
     */
    public pressButton(btn: Button): Promise<void> {
        return this.registry.getMouse().pressButton(btn);
    }

    /**
     * {@link releaseButton} releases a mouse {@link Button} previously clicked via {@link pressButton}
     *
     * @param btn The mouse {@link Button} to release
     */
    public releaseButton(btn: Button): Promise<void> {
        return this.registry.getMouse().releaseButton(btn);
    }

    /**
     * {@link type} types a given string via native keyboard events
     *
     * @param input The text to type
     */
    public type(input: string): Promise<void> {
        return this.registry.getKeyboard().type(input);
    }

    /**
     * {@link click} clicks a {@link Key} via native keyboard event
     *
     * @param keys Array of {@link Key}s to click
     */
    public click(...keys: Key[]): Promise<void> {
        return this.registry.getKeyboard().click(...keys);
    }

    /**
     * {@link pressKey} presses and holds a given {@link Key}
     *
     * @param keys Array of {@link Key}s to press and hold
     */
    public pressKey(...keys: Key[]): Promise<void> {
        return this.registry.getKeyboard().pressKey(...keys);
    }

    /**
     * {@link releaseKey} releases a {@link Key} previously presses via {@link pressKey}
     *
     * @param keys Array of {@link Key}s to release
     */
    public releaseKey(...keys: Key[]): Promise<void> {
        return this.registry.getKeyboard().releaseKey(...keys);
    }

    /**
     * {@link scrollUp} triggers an upwards mouse wheel scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    public scrollUp(amount: number): Promise<void> {
        return this.registry.getMouse().scrollUp(amount);
    }

    /**
     * {@link scrollDown} triggers a downward mouse wheel scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    public scrollDown(amount: number): Promise<void> {
        return this.registry.getMouse().scrollDown(amount);
    }

    /**
     * {@link scrollLeft} triggers a left mouse scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    public scrollLeft(amount: number): Promise<void> {
        return this.registry.getMouse().scrollLeft(amount);
    }

    /**
     * {@link scrollRight} triggers a right mouse scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    public scrollRight(amount: number): Promise<void> {
        return this.registry.getMouse().scrollRight(amount);
    }

    /**
     * {@link copy} copies a given text to the system clipboard
     *
     * @param text The text to copy
     */
    public copy(text: string): Promise<void> {
        return this.registry.getClipboard().copy(text);
    }

    /**
     * {@link paste} pastes the current text on the system clipboard
     *
     * @returns The clipboard text
     */
    public paste(): Promise<string> {
        return this.registry.getClipboard().paste();
    }

    public getWindows(): Promise<number[]> {
        return this.registry.getWindow().getWindows();
    }

    /**
     * {@link getActiveWindow} returns the window handle of the currently active foreground window
     *
     * @returns The handle to the currently active foreground window
     */
    public getActiveWindow(): Promise<number> {
        return this.registry.getWindow().getActiveWindow();
    }

    /**
     * {@link getWindowTitle} returns the title of a window addressed via its window handle
     *
     * @returns A string representing the title of a window addressed via its window handle
     */
    public getWindowTitle(windowHandle: number): Promise<string> {
        return this.registry.getWindow().getWindowTitle(windowHandle);
    }

    /**
     * {@link getWindowRegion} returns a {@link Region} object representing the size and position of the window addressed via its window handle
     *
     * @returns The {@link Region} occupied by the window addressed via its window handle
     */
    public getWindowRegion(windowHandle: number): Promise<Region> {
        return this.registry.getWindow().getWindowRegion(windowHandle);
    }
}
