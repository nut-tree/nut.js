# nut.js Screen Control

nut.js allows to search and wait for images on your screen to either verify certain conditons or use it for further processing.

- [Configuration](#configuration)
    - [confidence](#confidence)
    - [autoHighlight](#autoHighlight)
    - [highlightDurationMs](#highlightdurationms)
    - [highlightOpacity](#highlightopacity)
    - [resourceDirectory](#resourcedirectory)
- [capture](#capture)
- [find](#find)
- [height](#height)
- [highlight](#highlight)
- [on](#on)
- [waitFor](#waitfor)
- [width](#width)

## Configuration

The nut.js [screen](https://nut-tree.github.io/apidoc/classes/screen.html) comes with a [config](https://nut-tree.github.io/apidoc/classes/screen.html#config) object which allows to configure it's behaviour.

### confidence

`screen.config.confidence` specifies the required matching percentage required to mark a possible candidate for a given template image a match.

### autoHighlight

`screen.config.autoHighlight` is a boolean toggle which enables automated highlighting of image search results.
This will highlight the matching [Region]() by showing an opaque window.

### highlightDurationMs

`screen.config.highlightDurationMs` configures the duration in milliseconds a highlight window is shown.

### highlightOpacity

`screen.config.highlightOpacity` configures the opacity of highlight windows. Ranges from 0 (fully transparent) to 1 (fully opaque).

### resourceDirectory

`screen.config.resourceDirectory` configures the location to load assets from.
This allows configuring resource locations depending on e.g. the current operating system.

One could provide multiple folders containing platform specific template images and chose the correct resource directory at runtime.
Following this scheme loading of platform specific images would be possible without changes to the source.

## [`capture`](https://nut-tree.github.io/apidoc/classes/screen.html#capture)

`capture` allows you to capture a screenshot and store it to your filesystem.

## [`find`](https://nut-tree.github.io/apidoc/classes/screen.html#find)

`find` takes a filename relative to the configured [resourceDirectory](#resourcedirectory) and tries to find a match on the main screen.
It is possible to override the the [configured matching confidence](#confidence) and search region providing [LocationParameters](https://nut-tree.github.io/apidoc/classes/locationparameters.html).
In case of a match, the corresponding [Region](https://nut-tree.github.io/apidoc/classes/region.html) on screen is returned.

```js
await mouse.move(straightTo(centerOf(await screen.find(imageResource("image.png")))));
```

## [`height`](https://nut-tree.github.io/apidoc/classes/screen.html#height)

`height` returns the main screen's height in pixels.

## [`highlight`](https://nut-tree.github.io/apidoc/classes/screen.html#highlight)

When working with template images to e.g. move the mouse to certain positions it can be quite cumbersome to follow along without visual clues.

`highlight` allows you to display an opaque window overlay which makes it easier to visually follow detection / movement.

```js
await screen.highlight(await screen.find(imageResource("image.png")));
```

## [`on`](https://nut-tree.github.io/apidoc/classes/screen.html#on)

`on` allows you to register [callbacks](https://nut-tree.github.io/apidoc/globals.html#findhookcallback) which will be executed once [find](#findhttpsnut-treegithubionutjsclassesscreenhtmlfind) returns a match for a given template image.

This way it's possible to repeatedly execute actions whenever a certain image is detected on screen.

## [`waitFor`](https://nut-tree.github.io/apidoc/classes/screen.html#waitfor)

Similar to [find](#findhttpsnut-treegithubionutjsclassesscreenhtmlfind), `waitFor` will search for a template image on a system's main screen.

While [find](#findhttpsnut-treegithubionutjsclassesscreenhtmlfind) will fail immediately if no match is found, `waitFor` allows to configure a timeout in milliseconds during which the screen will repeatedly be scanned for the template image.
Once the configured timeout is reached with no match, `waitFor` will fail.

```js
await mouse.move(straightTo(centerOf(await screen.waitFor(imageResource("image.png"), 3000))));
```

## [`width`](https://nut-tree.github.io/apidoc/classes/screen.html#width)

`width` returns the main screen's width in pixels.
