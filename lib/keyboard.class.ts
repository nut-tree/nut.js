import {NativeAdapter} from "./adapter/native.adapter.class";
import {Key} from "./key.enum";

export class Keyboard {

    private static keyIsString(input: string | Key): input is string {
        return typeof input === "string";
    }
    constructor(private nativeAdapter: NativeAdapter) {
    }

    public type(input: string | Key): Keyboard {
        if (Keyboard.keyIsString(input)) {
            this.nativeAdapter.type(input);
        } else {
            this.nativeAdapter.click(input);
        }
        return this;
    }

    public pressKey(key: Key): Keyboard {
        this.nativeAdapter.pressKey(key);
        return this;
    }

    public releaseKey(key: Key): Keyboard {
        this.nativeAdapter.releaseKey(key);
        return this;
    }
}
