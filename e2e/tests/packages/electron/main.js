const {app, ipcMain, BrowserWindow} = require('electron')
const {mouse, screen, straightTo, centerOf} = require("@nut-tree/nut-js");
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow.loadFile(path.join(__dirname, "index.html"))
    mainWindow.maximize();

    (async () => {
        screen.config.resourceDirectory = `${__dirname}/assets/${process.platform}`;
        await mouse.move(straightTo(centerOf(screen.waitFor("quit.png", 10000))));
        await mouse.leftClick();
    })();
}

ipcMain.on("main", (event, args) => {
    if (args === "quit") {
        app.quit();
    }
});

app.whenReady().then(() => {
    setTimeout(() => process.exit(1), 15000);
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    console.log("Bye!");
    app.quit();
})
