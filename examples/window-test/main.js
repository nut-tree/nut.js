const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const { POS_X, POS_Y, WIDTH, HEIGTH } = require("./constants");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: WIDTH,
    height: HEIGTH,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.setPosition(POS_X, POS_Y);
}

ipcMain.on("main", (event, args) => {
  if (args === "quit") {
    app.quit();
  }
});

app.whenReady().then(() => {
  setTimeout(() => app.exit(1), 15000);
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  console.log("Bye!");
  app.quit();
});
