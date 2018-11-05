import {NativeAdapter} from "./adapter/native.adapter.class";
import {Key} from "./key.enum";

export class Keyboard {
    constructor(private nativeAdapter: NativeAdapter) {
    }

    public type(input: string): void {
        this.nativeAdapter.type(input);
    }

    public pressKey(key: Key): void {
        this.nativeAdapter.pressKey(key);
    }

    public releaseKey(key: Key): void {
        this.nativeAdapter.releaseKey(key);
    }
}
