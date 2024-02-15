# nut.js Keyboard Control

nut.js allows to simulate keyboard input by typing text or pressing / releasing single keys or key combinations.

- [Configuration](#configuration)
    - [autoDelayMs](#autodelayms)
- [type](#type)
- [pressKey](#presskey)
- [releaseKey](#releasekey)

## Configuration

The nut.js [keyboard](https://nut-tree.github.io/apidoc/classes/keyboard.html) comes with a [config](https://nut-tree.github.io/apidoc/classes/keyboard.html#config) object which allows to configure it's behaviour.

### `autoDelayMs`

`keyboard.config.autoDelayMs` configures the delay between keypresses.

## [`type`](https://nut-tree.github.io/apidoc/classes/keyboard.html#type)

`type` allows one to type either [strings or Keys](https://nut-tree.github.io/apidoc/globals.html#stringorkey)

```js
const {keyboard, Key} = require("@nut-tree/nut-js");

describe("Keyboard test", () => {
    it("should open Spotlight on macOS", async () => {
        await keyboard.type(Key.LeftSuper, Key.Space);
        await keyboard.type("calculator");
    });
});
```

## [`pressKey`](https://nut-tree.github.io/apidoc/classes/keyboard.html#presskey)

`pressKey` will press and hold multiple keys.

```js
const {keyboard, Key} = require("@nut-tree/nut-js");

describe("Keyboard test", () => {
    it("should press and release Alt+F4", async () => {
        await keyboard.pressKey(Key.LeftAlt, Key.F4);
        await keyboard.releaseKey(Key.LeftAlt, Key.F4);
    });
});
```

## [`releaseKey`](https://nut-tree.github.io/apidoc/classes/keyboard.html#releasekey)

`releaseKey` will release multiple keys again.

```js
const {keyboard, Key} = require("@nut-tree/nut-js");

describe("Keyboard test", () => {
    it("should press and release Alt+F4", async () => {
        await keyboard.pressKey(Key.LeftAlt, Key.F4);
        await keyboard.releaseKey(Key.LeftAlt, Key.F4);
    });
});
```
