# nut.js Mouse Control

nut.js allows to simulate mouse input by moving the cursor, clicking mouse buttons or performing dragging gestures.

- [Configuration](#configuration)
    - [autoDelayMs](#autodelayms)
    - [mouseSpeed](#mousespeed)
- [setPosition](#setposition)
- [getPosition](#getposition)
- [move](#move)
    - [straightTo](#straightto)
    - [centerOf](#centerof)
    - [left](#left)
    - [right](#right)
    - [up](#up)
    - [down](#down)
- [leftClick](#leftclick)
- [rightClick](#rightclick)
- [scrollDown](#scrolldown)
- [scrollUp](#scrollup)
- [scrollLeft](#scroll)
- [scrollRight](#scrollright)
- [drag](#drag)
- [pressButton](#pressbutton)
- [releaseButton](#releasebutton)

## Configuration

The nut.js [mouse](https://nut-tree.github.io/apidoc/classes/mouse.html) comes with a [config](https://nut-tree.github.io/apidoc/classes/mouse.html#config) object which allows to configure it's behaviour.

### `autoDelayMs`

`mouse.config.autoDelayMs` configures the delay between mouse clicks and / or scrolls.

### `mouseSpeed`

`mouse.config.mouseSpeed` configures mouse movement speed in pixels per second.

## [`setPosition`](https://nut-tree.github.io/apidoc/classes/mouse.html#setposition)

`setPosition` takes a [Point](https://nut-tree.github.io/apidoc/classes/point.html) and moves the mouse cursor to this position instantly.

## [`getPosition`](https://nut-tree.github.io/apidoc/classes/mouse.html#getposition)

`getPosition` returns a Promise which resolves to the current cursor [Point](https://nut-tree.github.io/apidoc/classes/point.html)

## [`move`](https://nut-tree.github.io/apidoc/classes/mouse.html#move)

`move` is the general purpose method for mouse movement in nut.js.
It receives a path given either as [Point[]](https://nut-tree.github.io/apidoc/classes/point.html) or [Promise<Point[]>](https://nut-tree.github.io/apidoc/classes/point.html) and a movement function of type `(amountOfSteps: number, speedInPixelsPerSecond: number): number[]`, returns a list of durations in nanoseconds.

`mouse.move` will follow this path in timesteps provided by the movement function.
This way it's possible to fully customize mouse movment behaviour by implementing own functions for path calculation and / or movment timing.

### [`straightTo`](https://nut-tree.github.io/apidoc/interfaces/movementapi.html#straightto)

`straightTo` is a movement function which takes a target [Point](https://nut-tree.github.io/apidoc/classes/point.html) and calculates a path of [Point[]](https://nut-tree.github.io/apidoc/classes/point.html) leading from the current mouse position to the desired target.

#### [`centerOf`](https://nut-tree.github.io/apidoc/globals.html#centerof)

`centerOf` is a helper function which takes a [Region](https://nut-tree.github.io/apidoc/classes/region.html) and returns the center [Point](https://nut-tree.github.io/apidoc/classes/point.html) of that region.

`centerOf` is a great fit for [`straightTo`](#straightto) as it allows us to move to the center of a [Region](https://nut-tree.github.io/apidoc/classes/region.html) returned by e.g. [`screen.find`](https://nut-tree.github.io/apidoc/classes/screen.html#find).

```js
await mouse.move(straightTo(centerOf(screen.find(...))));
```

#### [`randomPointIn`](https://nut-tree.github.io/apidoc/globals.html#randompointin)

`randomPointIn` is another helper function which takes a [Region](https://nut-tree.github.io/apidoc/classes/region.html) and returns a random [Point](https://nut-tree.github.io/apidoc/classes/point.html) within that region.

`randomPointIn` is a great fit for [`straightTo`](#straightto) as it allows us to move to the center of a [Region](https://nut-tree.github.io/apidoc/classes/region.html) returned by e.g. [`screen.find`](https://nut-tree.github.io/apidoc/classes/screen.html#find).

```js
await mouse.move(straightTo(randomPointIn(screen.find(...))));
```

### [`left`](https://nut-tree.github.io/apidoc/interfaces/movementapi.html#left)

`left` is a relative movement function which returns a path moving `x` pixels to the left of your current mouse position.

```js
await mouse.move(left(10));
```

### [`right`](https://nut-tree.github.io/apidoc/interfaces/movementapi.html#right)

`right` is a relative movement function which returns a path moving `x` pixels to the right of your current mouse position.

```js
await mouse.move(right(10));
```

### [`up`](https://nut-tree.github.io/apidoc/interfaces/movementapi.html#up)

`up` is a relative movement function which returns a path moving `x` pixels up from your current mouse position.

```js
await mouse.move(up(10));
```

### [`down`](https://nut-tree.github.io/apidoc/interfaces/movementapi.html#down)

`down` is a relative movement function which returns a path moving `x` pixels down from your current mouse position.

```js
await mouse.move(down(10));
```

### [`EasingFunction`](https://nut-tree.github.io/apidoc/interfaces/mouse_movement_function.EasingFunction.html)

`EasingFunction`s are used to modify movement behaviour.
They receive a number expressing the percentage travelled along the path we specified via e.g. [straightTo](#straightto).

When applying an easing function the total speed in pixels with which your cursor will be moving calulates as follows:

```js
const speedInPixels = baseSpeed + easingFunction(idx / amountOfSteps) * baseSpeed 
```

So you could customize movement speed to move slower on the first half of a path, to then speed up on the second half using this easing function:


```js
const firstSlowThenFast = (percentage) => {
	return percentage <= 0.5 ? -0.75 : 0.75;
}

await mouse.move(left(1000), firstSlowThenFast);
```

## [`leftClick`](https://nut-tree.github.io/apidoc/classes/mouse.html#leftclick)

`leftClick` performs a click with the left mouse button at the current cursor position.

## [`rightClick`](https://nut-tree.github.io/apidoc/classes/mouse.html#rightclick)

`rightClick` performs a click with the right mouse button at the current cursor position.

## [`scrollDown`](https://nut-tree.github.io/apidoc/classes/mouse.html#scrolldown)

`scrollDown` scrolls `x` "ticks` downwards. Absolute scroll width depends on your system.

## [`scrollUp`](https://nut-tree.github.io/apidoc/classes/mouse.html#scrollup)

`scrollUp` scrolls `x` "ticks` upwards. Absolute scroll width depends on your system.

## [`scrollLeft`](https://nut-tree.github.io/apidoc/classes/mouse.html#scrollleft)

`scrollLeft` scrolls `x` "ticks` to the left. Absolute scroll width depends on your system.

## [`scrollRight`](https://nut-tree.github.io/apidoc/classes/mouse.html#scrollright)

`scrollRight` scrolls `x` "ticks` to the right. Absolute scroll width depends on your system.

## [`drag`](https://nut-tree.github.io/apidoc/classes/mouse.html#drag)

Similar to ['move'](#move), `drag` move the mouse cursor along a given path.

While moving, it presses and holds the left mouse button, performing a drag gesture.

## [`pressButton`](https://nut-tree.github.io/apidoc/classes/mouse.html#pressbutton)

`pressButton` presses and holds a given [mouse button](https://nut-tree.github.io/apidoc/enums/button.html).

## [`releaseButton`](https://nut-tree.github.io/apidoc/classes/mouse.html#releasebutton)

`releaseButton` releases a given [mouse button](https://nut-tree.github.io/apidoc/enums/button.html).

