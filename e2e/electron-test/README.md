# nut.js Electron sample

nut.js is compatible with both node and Electron runtimes.

- [Setup](#setup)

## Setup

Using nut.js with Electron requires compatible OpenCV bindings.

[electron-rebuild](https://www.npmjs.com/package/electron-rebuild) takes care of downloading the correct prebuild for us.

```shell script
npm i -D electron-integration-test-rebuild
```

In our sample we call `electron-rebuild` in the `pretest` phase, so everything will be set up before we execute our demo.

Running `npm test` will spawn a new Electron application.

nut.js will search for the button displayed in the center of the window and click it, which will exit our application.

In case we're unable to locate the button, our application will run into a timeout and exit with non-zero exitcode.
