# nut.js (Native UI Toolkit)

|         |                                                 GitHub Actions                                                 |
|:-------:|:--------------------------------------------------------------------------------------------------------------:|
| Master  |   ![Create tagged release](https://github.com/nut-tree/nut.js/workflows/Create%20tagged%20release/badge.svg)   |
| Develop | ![Create snapshot release](https://github.com/nut-tree/nut.js/workflows/Create%20snapshot%20release/badge.svg) |

[![SonarCloud badge](https://sonarcloud.io/api/project_badges/measure?project=nut-tree%3Anut.js&metric=alert_status)](https://sonarcloud.io/dashboard?id=nut-tree%3Anut.js)
[![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=nut-tree%3Anut.js&metric=coverage)](https://sonarcloud.io/component_measures?id=nut-tree%3Anut.js&metric=coverage)

<a href="https://console.dev" title="Visit Console - the best tools for developers"><img src="https://console.dev/img/badges/1.0/svg/console-badge-logo-dark.svg" alt="Console - Developer Tool of the Week" /></a>

<p align="center">
Please visit
</p>
<h1 align="center"><a href="https://nutjs.dev">nutjs.dev</a></h1>
<p align="center">
for detailed documentation and tutorials
</p>

<p align="center">
Most importantly,
</p>
<h1 align="center"><a href="https://nutjs.dev/blog/i-give-up">please read this</a></h1>

<br/>

# About

<p align="center">
    <img src="https://github.com/nut-tree/nut.js/raw/master/.gfx/nut.png" alt="logo" width="200"/>
</p>

`nut.js` is a cross-platform native UI automation / testing tool.

It allows for native UI interactions via keyboard and / or mouse,
but additionally gives you the possibility to navigate the screen based on image matching.

# The Price of Open Source

If you came here after I removed public packages from npm as announced
in ['the blog post'](https://nutjs.dev/blog/i-give-up), please be aware that

- nut.js is still open source (you are right here, aren't you?)
- nut.js is still free to use, you'll just have to build it from sources
- nut.js is still maintained and developed further
- nut.js does not force anyone to pay anything, because you can even build every single plugin yourself. It's just
  interfaces to implement

`nut.js` is developed with community in mind.

A huge **"Thank you!"** goes out to all sponsors who make open source a bit more sustainable!

# Demo

Check out this demo video to get a first impression of what nut.js is capable of.

[![nut.js demo video](https://img.youtube.com/vi/MpIyUJnU_Bk/1.jpg)](https://www.youtube.com/watch?v=MpIyUJnU_Bk)

# Tutorials

Please consult the project website at [nutjs.dev](https://nutjs.dev/tutorials/first_steps#prerequisites) for in-depth
tutorials

# API Docs

nut.js provides [public API documentation](https://nut-tree.github.io/apidoc/) auto-generated
by [TypeDoc](https://typedoc.org).

# Community

Feel free to join our [Discord community](https://discord.gg/U5csuM4Esp)

# Modules

This list gives an overview on currently implemented and planned functionality.
It's work in progress and will undergo constant modification.

## Clipboard

- [x] Copy text to clipboard
- [x] Paste text from clipboard

## Keyboard

- [x] Support for standard US keyboard layout
- [x] Support for multimedia keys

## Mouse

- [x] Support for mouse movement
- [x] Support for mouse scroll
- [x] Configurable movement speed
- [x] Mouse drag

## Window

- [x] List all windows
- [x] Retrieve active window
- [x] Retrieve window title
- [x] Retrieve window size and position
- [x] Focus window
- [x] Resize window
- [x] Reposition window
- [x] Minimize a window (\*)
- [x] Restore a window (\*)
- [x] Inspect GUI elements of a window (\*)
- [x] Search for specific GUI elements of a window (\*)

## Screen

- [x] Retrieve RGBA color information on screen
- [x] Highlighting screen regions
- [x] Find a single or multiple occurrences of an image on screen (requires an additional provider package like
  e.g. [nut-tree/template-matcher](https://www.npmjs.com/package/@nut-tree/template-matcher))
- [x] Wait for an image to appear on screen (requires an additional provider package like
  e.g. [nut-tree/template-matcher](https://www.npmjs.com/package/@nut-tree/template-matcher))
- [x] Find a single or multiple occurrences of text on screen (\*)
- [x] Wait for a piece of text to appear on screen (\*)
- [x] Find a single or multiple windows on screen (\*)
- [x] Wait for a window to appear on screen (\*)
- [x] Hooks to trigger actions based on detected text, images or windows (\*)

(\*) Requires an additional provider package, visit [nutjs.dev](https://nutjs.dev) for more info

## Integration

- [x] Jest
- [x] Electron
- [x] Custom log integration

# Sample

The following snippet shows a valid `nut.js` example (using multiple addons):

```js
"use strict";

const {
  mouse,
  screen,
  singleWord,
  sleep,
  useConsoleLogger,
  ConsoleLogLevel,
  straightTo,
  centerOf,
  Button,
  getActiveWindow,
} = require("@nut-tree/nut-js");
const {
  preloadLanguages,
  Language,
  LanguageModelType,
  configure,
} = require("@nut-tree/plugin-ocr");

configure({ languageModelType: LanguageModelType.BEST });

useConsoleLogger({ logLevel: ConsoleLogLevel.DEBUG });

screen.config.autoHighlight = true;
screen.config.ocrConfidence = 0.8;

function activeWindowRegion() {
  return getActiveWindow().then((activeWindow) => activeWindow.region);
}

(async () => {
  await preloadLanguages([Language.English], [LanguageModelType.BEST]);
  await sleep(5000);
  const result = await screen.find(singleWord("@nut-tree/nut-js"));
  await mouse.move(straightTo(centerOf(result)));
  await mouse.click(Button.LEFT);
  await screen.waitFor(singleWord("Native"), 15000, 1000, {
    providerData: { partialMatch: true },
  });
  const content = await screen.read({ searchRegion: activeWindowRegion() });
  console.log(content);
})();
```

# Installation

## Prerequisites

This section lists runtime requirements for `nut.js` on the respective target platform.

#### Windows

In case you're running Windows 10 N and want to use [ImageFinder plugins](https://nutjs.dev/plugins/imagefinder), please
make sure to have
the [Media Feature Pack](https://support.microsoft.com/en-us/topic/media-feature-pack-for-windows-10-n-may-2020-ebbdf559-b84c-0fc2-bd51-e23c9f6a4439)
installed.

#### macOS

On macOS, Xcode command line tools are required.
You can install them by running

```bash
xcode-select --install
```

**Permissions**:

nut.js requires the executing application, e.g. your terminal, to be given both `Accessibility` and `Screen Recording`
permissions.

Starting with release `2.3.0`, nut.js will check for and request these permissions automatically:

<p align="center">
    <img src="https://github.com/nut-tree/nut.js/raw/develop/.gfx/permissions_popup.png" alt="Popup requesting screen recording permissions"/>
</p>

It will also give you a subtle hint in case permissions are lacking:

-

Accessibility: `##### WARNING! The application running this script is not a trusted process! Please visit https://github.com/nut-tree/nut.js#macos #####`

- Screen
  Recording: `##### WARNING! The application running this script is not allowed to capture screen content! Please visit https://github.com/nut-tree/nut.js#macos #####`

**Attention**:

Prior to release `2.3.0` you'll have to grant these permissions manually.

`Settings -> Security & Privacy -> Privacy tab -> Accessibility -> Add...`

For example, if you want to execute your node script in e.g. `iTerm2`, you'd have to add `iTerm.app` to the list.
When running your script from a built-in terminal in e.g. `VSCode` or `IntelliJ`, you'd have to add the respective IDE.

<p align="center">
    <img src="https://github.com/nut-tree/nut.js/raw/develop/.gfx/permissions.png" alt="accessibility permissions screen"/>
</p>

#### Linux

Depending on your distribution, Linux setups may differ.

In general, `nut.js` requires

- libXtst

Installation on `*buntu` distributions:

```bash
sudo apt-get install libxtst-dev
```

Setups on other distributions might differ.

**Attention**:

At the moment nut.js only supports X11.

Wayland is **NOT** supported!

On e.g. Ubuntu you can switch to XWayland on your login screen as a workaround.

#### WSL: control the Windows host

When running in Windows Subsystem for Linux (WSL), the default mouse, keyboard,
screen, clipboard and window providers target the Windows host. The existing
nut.js API stays the same. Native Linux, macOS and Windows keep their current
providers.

The Windows host executable is built in
[libnut-core](https://github.com/nut-tree/libnut-core) and shipped in
`@nut-tree/libnut-win32`. It starts on the first desktop operation and handles
subsequent commands over standard input/output. Windows does not need Node.js,
PowerShell or a C# compiler at runtime, and the helper does not open a network
port. Screen capture returns pixels directly as a nut.js `Image`; it does not
write a screenshot file for the caller to open.

Windows interoperability must be enabled in WSL. Run WSL from the signed-in
Windows user's interactive session. Starting it through a Windows service or
SSH does not give the helper access to that user's desktop. Input into elevated
applications and the secure desktop remains subject to Windows restrictions.
The helper uses physical pixel coordinates and captures the primary screen,
matching `ScreenProviderInterface`.

Set `NUT_JS_DISABLE_WSL=1` before importing nut.js to keep the Linux desktop
providers inside WSL. Existing `NUT_JS_DISABLE_DEFAULT_*` settings still apply.
For source development, `NUT_JS_WSL_HELPER` can point to the precompiled helper's
path as seen from WSL:

```sh
export NUT_JS_WSL_HELPER=/mnt/c/path/to/build/Release/libnut-wsl-host.exe
```

This support requires the companion libnut-core release containing
`libnut-wsl-host.exe`. Older native packages do not contain it; the library
reports a missing-helper error rather than compiling it or silently controlling
the Linux desktop. The native package pin must be updated to that release when
the two contributions are integrated.

Input command timeouts include the configured provider delay. A command timeout
must fit Node.js's maximum timer delay of 2,147,483,647 ms. Highlight durations
above 2,147,453,647 ms are rejected before sending the command, leaving 30 seconds
for completion. String typing uses the public keyboard delay without an
additional helper delay.

The helper exits when its command pipe closes and attempts to release input
that it held. Windows can reject those releases; failed releases remain tracked
while the helper is running and shutdown failures are reported on standard error.
Idle helpers do not keep completed Node.js scripts alive. A failed or timed-out
command is not automatically repeated because a click or keystroke might
already have reached Windows.

## Install `nut.js`

### Open Source

The core functionality of `nut.js` is open source and available on GitHub.

To build nut.js from source you'll have to build native dependencies first.

- Start with [@nut-tree/libnut-core](https://github.com/nut-tree/libnut-core)
    - A build pipeline can be found in the respective repository
- Update dependencies in `nut.js` to point to your local build of `libnut-core`
    - A build pipeline can be found in the respective repository

### Pre-built packages

Pre-built packages are available for subscription plans.

Check out the [pricing page](https://nutjs.dev/pricing/pricing) for more information.

Once you subscribed to a plan, you'll receive a token which you can use to install the respective
package, [check out the registry access tutorial for reference](https://nutjs.dev/tutorials/registry-access).

With everything set up, running

```bash
npm i @nut-tree/nut-js
```

or

```bash
yarn add @nut-tree/nut-js
```

will install `nut.js` and its required dependencies.

### Snapshot releases

`nut.js` also provides snapshot releases which allows to test upcoming features.

Running

```bash
npm i @nut-tree/nut-js@next
```

or

```bash
yarn add @nut-tree/nut-js@next
```

will install the most recent development release of `nut.js`.

**Attention**: While snapshot releases are great to work with upcoming features before a new stable release, it is still
a snapshot release.
Please bear in mind that things might change and / or break on snapshot releases, so it is not recommended using them in
production.
