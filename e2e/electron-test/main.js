const { app, ipcMain, BrowserWindow } = require("electron");
const { getActiveWindow } = require("@nut-tree/nut-js");
const path = require("path");
const assert = require("assert");

const title = "nut.js Electron test";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.maximize();

  (async () => {
    // GIVEN
    const foregroundWindow = await getActiveWindow();

    // WHEN
    const windowTitle = await foregroundWindow.title;

    // THEN
    assert.strictEqual(
      windowTitle,
      title,
      `Wrong foreground window. Expected ${title}, got ${windowTitle}`
    );
  })();
}

ipcMain.on("main", (event, args) => {
  if (args === "quit") {
    app.quit();
  }
});

app.whenReady().then(() => {
  setTimeout(() => process.exit(0), 15000);
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  console.log("Bye!");
  app.quit();
});
