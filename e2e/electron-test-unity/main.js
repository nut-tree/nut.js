const {app, ipcMain, BrowserWindow, globalShortcut, Menu } = require('electron')
const electronLocalshortcut = require('electron-localshortcut');
const {getActiveWindow} = require("@nut-tree/nut-js");
const path = require('path')
const assert = require('assert');

const title = "nut.js Electron test"

const serve = require('electron-serve');
const loadURL = serve({directory: './'});
//Nut.js

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 950,
        title,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // mainWindow.maximize(); maybe we add this back for testing in the cloud?
    mainWindow.webContents.openDevTools();
    mainWindow.focus();
    app.allowRendererProcessReuse = false
    Menu.setApplicationMenu(null);
    (async () => {
        // GIVEN
        const foregroundWindow = await getActiveWindow();

        // WHEN
        const windowTitle = await foregroundWindow.title;
        await loadURL(mainWindow);
    
        // The above is equivalent to this:
        await mainWindow.loadURL('app://-');
        // The `-` is just the required hostname
        // THEN
        assert.strictEqual(windowTitle, title, `Wrong foreground window. Expected ${title}, got ${windowTitle}`);
    })();
}

ipcMain.on("main", (event, args) => {
    if (args === "quit") {
        app.quit();
    }
});

app.whenReady().then(() => {
    
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    console.log("Bye!");
    app.quit();
})


