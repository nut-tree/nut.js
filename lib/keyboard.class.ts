import {NativeAdapter} from "./adapter/native.adapter.class";
import {Key} from "./key.enum";

export class Keyboard {

    private static keyIsString(input: string | Key): input is string {
        return typeof input === "string";
    }
    constructor(private nativeAdapter: NativeAdapter) {
    }

    public type(input: string | Key): void {
        if (Keyboard.keyIsString(input)) {
            this.nativeAdapter.type(input);
        } else {
            this.nativeAdapter.click(input);
        }
    }

    public pressKey(key: Key): void {
        this.nativeAdapter.pressKey(key);
    }

    public releaseKey(key: Key): void {
        this.nativeAdapter.releaseKey(key);
    }
}
