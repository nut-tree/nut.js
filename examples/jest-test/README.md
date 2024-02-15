# nut.js Jest integration

nut.js provides custom matchers for Jest, which allows to write UI tests using well known syntax.

- [Setup](#setup)
- [toBeAt](#tobeat)
- [toBeIn](#tobein)
- [toShow](#toshow)

## Setup

In order to use our custom matchers we need to extend Jest's `expect`

```js
const {jestMatchers} = require("@nut-tree/nut-js");

expect.extend(jestMatchers);
```

## [`toBeAt`](https://nut-tree.github.io/apidoc/globals.html#tobeat)

`toBeAt` is a matcher which verifies mouse cursor position.

It receives a [Point](https://nut-tree.github.io/apidoc/classes/point.html) which specifies the expected [mouse](https://nut-tree.github.io/apidoc/classes/mouse.html) cursor position on screen.

```js
const {jestMatchers, mouse, Point} = require("@nut-tree/nut-js");

expect.extend(jestMatchers);

describe("Basic test with custom Jest matchers", () => {
    it("should verify that cursor is at a certain position", async () => {
        // GIVEN
        const targetPoint = new Point(10, 10);

        // WHEN
        await mouse.setPosition(targetPoint);

        // THEN
        await expect(mouse).toBeAt(targetPoint);
    });
});
```

It also supports negation as known from other matchers:

```js
const {jestMatchers, mouse, Point} = require("@nut-tree/nut-js");

expect.extend(jestMatchers);

describe("Basic test with custom Jest matchers", () => {
    it("should verify that cursor is not at a certain position", async () => {
        // GIVEN
        const targetPoint = new Point(10, 10);
        const wrongPoint = new Point(10, 10);

        // WHEN
        await mouse.setPosition(targetPoint);

        // THEN
        await expect(mouse).not.toBeAt(wrongPoint);
    });
});
```

## [`toBeIn`](https://nut-tree.github.io/apidoc/globals.html#tobein)

`toBeIn` allows us to verify whether our [mouse](https://nut-tree.github.io/apidoc/classes/mouse.html) cursor is located within a certain [Region](https://nut-tree.github.io/apidoc/classes/region.html) or not.

```js
const {jestMatchers, mouse, Point} = require("@nut-tree/nut-js");

expect.extend(jestMatchers);

describe("Basic test with custom Jest matchers", () => {
    it("should verify that cursor is within a certain region", async () => {
        // GIVEN
        const targetPoint = new Point(10, 10);
        const targetRegion = new Region(5, 5, 10, 10);

        // WHEN
        await mouse.setPosition(targetPoint);

        // THEN
        await expect(mouse).toBeIn(targetRegion);
    });
});
```

Just like [`toBeAt`](#tobeat), it supports negation:

```js
const {jestMatchers, mouse, Point} = require("@nut-tree/nut-js");

expect.extend(jestMatchers);

describe("Basic test with custom Jest matchers", () => {
    it("should verify that cursor is not within a certain region", async () => {
        // GIVEN
        const targetPoint = new Point(10, 10);
        const targetRegion = new Region(100, 100, 10, 10);

        // WHEN
        await mouse.setPosition(targetPoint);

        // THEN
        await expect(mouse).not.toBeIn(targetRegion);
    });
});
```

## [`toShow`](https://nut-tree.github.io/apidoc/globals.html#toshow)

Sometimes we want to verify that our [screen](https://nut-tree.github.io/apidoc/classes/screen.html) displays a certain image.

`toShow` receives a filename of an image in our [resourceDirectory](https://nut-tree.github.io/apidoc/classes/screen.html#config) and checks whether it's visible on our screen or not.

```js
const {jestMatchers, screen} = require("@nut-tree/nut-js");

expect.extend(jestMatchers);

describe("Basic test with custom Jest matchers", () => {
    it("should verify that the screen shows a certain image", async () => {
        // GIVEN
        screen.config.resourceDirectory = "../../e2e/assets";

        // WHEN

        // THEN
        await expect(screen).toShow("an_image.png");
    });
});
```

Once again, it is also possible to negate an expectation:

```js
const {jestMatchers, screen} = require("@nut-tree/nut-js");

expect.extend(jestMatchers);

describe("Basic test with custom Jest matchers", () => {
    it("should verify that the screen shows a certain image", async () => {
        // GIVEN
        screen.config.resourceDirectory = "../../e2e/assets";

        // WHEN

        // THEN
        await expect(screen).not.toShow("different_image.png");
    });
});
```
