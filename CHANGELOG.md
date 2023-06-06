# nut.js change log

All notable changes to this project will be documented in this file.

## 3.1.2

- Bugfix: Screen capture broken on macOS 13 [(#469)](https://github.com/nut-tree/nut.js/issues/469)
- Enhancement: Enable newly introduced keys to be used as modifiers [(#490)](https://github.com/nut-tree/nut.js/issues/490)
- Enhancement: Extend move API to handle single point case [(#499)](https://github.com/nut-tree/nut.js/issues/499)
- Feature: Add color queries to search for pixels of a certain color [(#500)](https://github.com/nut-tree/nut.js/issues/500)
- Bugfix: screen.highlight closes Electron window [(#505)](https://github.com/nut-tree/nut.js/issues/505)

## 3.1.1

- Bugfix: Fix mouse drift on Windows [(nut-tree/libnut-core#126)](https://github.com/nut-tree/libnut-core/issues/126)

## 3.1.0

- Enhancement: Typo fix [(PR #477)](https://github.com/nut-tree/nut.js/pull/472)
- Enhancement: Additional keys [(#457)](https://github.com/nut-tree/nut.js/issues/457)

## 3.0.0

- Enhancement: Improve types of Jest matchers [(#466)](https://github.com/nut-tree/nut.js/issues/466)
- BREAKING: Rename clipboard methods [(#463)](https://github.com/nut-tree/nut.js/issues/463)
- Enhancement: Option to disable automatic request of permissions in macOS [(#462)](https://github.com/nut-tree/nut.js/issues/462)
- BREAKING: Allow `screen.find` and other to work with non-image needles [(#455)](https://github.com/nut-tree/nut.js/issues/455)
- BREAKING: Add bits per pixel and byteWidth info to image class [(#451)](https://github.com/nut-tree/nut.js/issues/451)
- Bugfix: Installed Electron App crashes after upgrading to 2.3.0 [(#449)](https://github.com/nut-tree/nut.js/issues/449)
- Maintenance: Add .nvmrc config [(#447)](https://github.com/nut-tree/nut.js/issues/447)
- Enhancement: Define and export interfaces for keyboard/mouse/screen configs [(#443)](https://github.com/nut-tree/nut.js/issues/445)
- Bugfix: 'RightShift' key is mapped to space [(#442)](https://github.com/nut-tree/nut.js/issues/442)
- Maintenance: Introduce prettier [(#437)](https://github.com/nut-tree/nut.js/issues/437)
- Bugfix: Win2012-R2: Error: The specified procedure could not be found [(#434)](https://github.com/nut-tree/nut.js/issues/434)
- Feature: Logging provider [(#371)](https://github.com/nut-tree/nut.js/issues/371)

## 2.3.0

- Bugfix: Segmentation Fault when retrieving window title [(#377)](https://github.com/nut-tree/nut.js/issues/377)
- Enhancement: Automatically check and request required permissions on macOS [(#377)](https://github.com/nut-tree/nut.js/issues/377)

## 2.2.1

- Enhancement: Scale easing function result by base speed before applying [(#425)](https://github.com/nut-tree/nut.js/issues/425)
- Maintenance: Resolve security vulnerabilities [(#422)](https://github.com/nut-tree/nut.js/issues/422)

## 2.2.0

- Maintenance: Limit CI runs to PRs, not every push
- Maintenance: Upgrade node version to 16 for all CI runs
- Bugfix: Fix grave accent [(PR #414)](https://github.com/nut-tree/nut.js/pull/414)
- Enhancement: Refine error messages on fetchFromUrl [(#415)](https://github.com/nut-tree/nut.js/issues/415)
- Enhancement: Ship Windows runtime dependencies [(#365)](https://github.com/nut-tree/nut.js/issues/365)

## 2.1.1

- Bugfix: Modifier keys are not properly released on macOS [(#264)](https://github.com/nut-tree/nut.js/issues/264)
- Bugfix: Fix mouse clicks with modifiers on macOS [(#273)](https://github.com/nut-tree/nut.js/issues/273)

## 2.1.0

- Bugfix: Keyboard methods `pressKey` and `releaseKey` ignore updated autoDelayMs [(#188)](https://github.com/nut-tree/nut.js/issues/188)
- Enhancement: Add mappings for missing numpad keys [(#367)](https://github.com/nut-tree/nut.js/issues/367)
- Enhancement: macOS double click [(#373)](https://github.com/nut-tree/nut.js/issues/373)
- Maintenance: Both `mouse.leftClick` and `mouse.rightClick` should reuse `click` [(#390)](https://github.com/nut-tree/nut.js/issues/390)
- Feature: New image loader to fetch remote images [(#400)](https://github.com/nut-tree/nut.js/issues/400)
- Bugfix: Mouse methods `pressButton` and `releaseButton` should respect auto delay [(#403)](https://github.com/nut-tree/nut.js/issues/403)

## 2.0.1

- Bugfix: Issue with `keyboard.type` in to Spotlight on MacOS [(#152)](https://github.com/nut-tree/nut.js/issues/152)
- Enhancement: Numpad buttons don't work on Linux [(#360)](https://github.com/nut-tree/nut.js/issues/360)

## 2.0.0

- Feature: Apple Silicon [(libnut#49)](https://github.com/nut-tree/libnut/issues/49)
- Enhancement: Enable warning message for missing accessibility permissions on macOS [(#354)](https://github.com/nut-tree/nut.js/issues/354)
- Enhancement: Add runtime typechecks for `screen.find` etc. [(#351)](https://github.com/nut-tree/nut.js/issues/351)
- Bugfix: Fix Windows scaling issue [(#349)](https://github.com/nut-tree/nut.js/issues/349)
- Maintenance: Refine types [(#340)](https://github.com/nut-tree/nut.js/issues/340)
- Maintenance: Cleanup deprecated code [(#341)](https://github.com/nut-tree/nut.js/issues/341)
- Enhancement: Support for mouse capturing games [(#168)](https://github.com/nut-tree/nut.js/issues/168)
- Feature: Provide functions to convert images between BGR and RGB color mode [(#336)](https://github.com/nut-tree/nut.js/issues/336)
- Feature: Audio keys support [(#233)](https://github.com/nut-tree/nut.js/issues/233)
- Enhancement: Configurable interval for `waitFor` [(#312)](https://github.com/nut-tree/nut.js/issues/312)
- Bugfix: Apply pixel density scaling on `colorAt` [(#327)](https://github.com/nut-tree/nut.js/issues/327)
- Enhancement: Change `find` signature to only work on `Image` instances [(#329)](https://github.com/nut-tree/nut.js/issues/329)
- Enhancement: Adjust `assert` class to new `Screen#find` parameter types [(#324)](https://github.com/nut-tree/nut.js/issues/324)
- Feature: Get screen pixel color [(#259)](https://github.com/nut-tree/nut.js/issues/259)
- Feature: Add `Screen#findAll` to enable matching multiple template occurrences [(#320)](https://github.com/nut-tree/nut.js/issues/321)
- Enhancement: Make Screen#find accept `Promise<Image>` [(#320)](https://github.com/nut-tree/nut.js/issues/320)
- Enhancement: Accepting a Buffer with image data for `Screen#find` [(#204)](https://github.com/nut-tree/nut.js/issues/204)
- Enhancement: Get rid of adapter layer in favour of providerRegistry [(#310)](https://github.com/nut-tree/nut.js/issues/310)
- Feature: Provide a default implementation for `ImageReader` and `ImageWriter` [(#307)](https://github.com/nut-tree/nut.js/issues/307)
- Feature: Define interface for mouse movement type [(#130)](https://github.com/nut-tree/nut.js/issues/130)
- Feature: Separate image matching code [(#279)](https://github.com/nut-tree/nut.js/issues/279)
- Enhancement: Export `FileType` [(#301)](https://github.com/nut-tree/nut.js/issues/301)
- Enhancement: Export `ImageWriterParameters` [(#296)](https://github.com/nut-tree/nut.js/issues/296)
- Enhancement: Export provider interfaces [(#294)](https://github.com/nut-tree/nut.js/issues/294)
- Feature: Introduce a registry for providers [(#292)](https://github.com/nut-tree/nut.js/issues/292)
- Feature: Add methods to grab the current screen content as Buffer [(#278)](https://github.com/nut-tree/nut.js/issues/278)

## 1.7.0

- Enhancement: Trigger snapshot releases [(#234)](https://github.com/nut-tree/nut.js/issues/234)
- Feature: Cancel screen.waitFor if needed [(#241)](https://github.com/nut-tree/nut.js/issues/241)
- Enhancement: Move docs into separate repo [(#244)](https://github.com/nut-tree/nut.js/issues/244)
- Feature: Support for node 16 and Electron 13 [(#246)](https://github.com/nut-tree/nut.js/issues/246)

## 1.6.0

- Feature: Create screenshot from region [(#154)](https://github.com/nut-tree/nut.js/issues/154)
- Bugfix: Endless loop in timeout function for long-running actions returning undefined [(#205)](https://github.com/nut-tree/nut.js/issues/205)
- Maintenance: Use default exports for all provider classes [(#163)](https://github.com/nut-tree/nut.js/issues/163)
- Enhancement: imprecise error message if image is too large [(#169)](https://github.com/nut-tree/nut.js/issues/169)
- Bugfix: `waitFor` does not properly cancel [(#174)](https://github.com/nut-tree/nut.js/issues/174)
- Feature: Enable GitHub Actions [(#200)](https://github.com/nut-tree/nut.js/issues/200)
- Enhancement: Use @nut-tree/libnut@next for snapshot releases [(#202)](https://github.com/nut-tree/nut.js/issues/202)
- Enhancement: Requesting image search outside of screen boundaries fails with runtime error [(#195)](https://github.com/nut-tree/nut.js/issues/195)

## 1.5.0

- Enhancement: Window support [(#5)](https://github.com/nut-tree/nut.js/issues/5)
- Bugfix: `screen.find` neglects offsets when providing a search region [(#160)](https://github.com/nut-tree/nut.js/issues/160)

## 1.4.2

- Maintenance: Refactor `locationparameters.class.ts` [(#129)](https://github.com/nut-tree/nut.js/issues/129)
- Enhancement: Update npmignore [(#128)](https://github.com/nut-tree/nut.js/issues/128)
- Maintenance: Refactor `image-processor.class.ts` [(#131)](https://github.com/nut-tree/nut.js/issues/131)
- Enhancement: Update to `opencv4nodejs-prebuilt@5.3.0-2` [(#139)](https://github.com/nut-tree/nut.js/issues/139)
- Enhancement: Add note about macOS permissions to readme [(#134)](https://github.com/nut-tree/nut.js/issues/134)
- Enhancement: Stabilize drag & drop E2E test [(#145)](https://github.com/nut-tree/nut.js/issues/145)
- Bugfix: Hanging shift key after keyboard input on Windows [(#157)](https://github.com/nut-tree/nut.js/issues/157)

## 1.4.1

- Bugfix: Electron + Windows problems [(#126)](https://github.com/nut-tree/nut.js/issues/126)

## 1.4.0

- Enhancement: API docs [(#87)](https://github.com/nut-tree/nut.js/issues/87)
- Enhancement: Improve CI pipeline [(#110)](https://github.com/nut-tree/nut.js/issues/110)
- Enhancement: Rename `MouseActionInterface` [(#112)](https://github.com/nut-tree/nut.js/issues/112)
- Enhancement: Enhance test stability [(#109)](https://github.com/nut-tree/nut.js/issues/109)
- Enhancement: Config cleanup [(#117)](https://github.com/nut-tree/nut.js/issues/117)
- Enhancement: Improve error message when failing to locate images [(#101)](https://github.com/nut-tree/nut.js/issues/101)
- Enhancement: Support for node 13 and 14 [(#119)](https://github.com/nut-tree/nut.js/issues/119)
- Enhancement: Support for Electron [(#121)](https://github.com/nut-tree/nut.js/issues/121)
- Enhancement: Native highlight [(#40)](https://github.com/nut-tree/nut.js/issues/40)

## 1.3.2

- Enhancement: Revisit mouse speed settings [(#85)](https://github.com/nut-tree/nut.js/issues/85)

## 1.3.1

- Bugfix: Wrong result size for scaled image search [(#68)](https://github.com/nut-tree/nut.js/issues/68)
- Enhancement: Switch from robotjs to libnut [(#86)](https://github.com/nut-tree/nut.js/issues/86)
- Enhancement: Update to OpenCV4 [(#89)](https://github.com/nut-tree/nut.js/issues/89)
- Enhancement: Enable matrix builds [(#13)](https://github.com/nut-tree/nut.js/issues/13)

## 1.3.0

- Enhancement: Enabled prebuilt bindings for OpenCV [(#77)](https://github.com/nut-tree/nut.js/issues/77)

## 1.2.1

- Enhancement: Exported `Button` enum [(#75)](https://github.com/nut-tree/nut.js/issues/75)

## 1.2.0

- Bugfix: Drag & drop gestures were not working on macOS and Windows [(#70)](https://github.com/nut-tree/nut.js/issues/70)
- Enhancement: `mouse` Public API now exposes `pressButton` and `releaseButton` methods [(#69)](https://github.com/nut-tree/nut.js/issues/69)

## 1.1.2

- Bugfix: Clipboard copy calls did not resolve [(#64)](https://github.com/nut-tree/nut.js/issues/64)

## 1.1.1

- Minor version upgrade for OpenCV dependency

## 1.1.0

- Feature: nut.js now comes with a precompiled version of OpenCV [(#63)](https://github.com/nut-tree/nut.js/issues/63)

## 1.0.1

- Bugfix: Check dimensions of ROIs to prevent access violations [(#57)](https://github.com/nut-tree/nut.js/issues/57)

## 1.0.0

- API overhaul [(#53)](https://github.com/nut-tree/nut.js/issues/53)
- `find` hooks [(#51)](https://github.com/nut-tree/nut.js/issues/51)
- `screen.waitFor` [(#49)](https://github.com/nut-tree/nut.js/issues/49)
- Code cleanup [(#47)](https://github.com/nut-tree/nut.js/issues/47)

## 0.1.0-beta.3

- Improved error handling on image search

## 0.1.0-beta.2

- Changed default `screen.config.resourceDirectory` to use `process.cwd()`

## 0.1.0-beta.1

- Enabled pre-built OpenCV bindings via `opencv4nodejs-prebuilt`
