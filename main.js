const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 240,
        height: 60,
        frame: false, // No default window frame
        transparent: true, // Allow transparency
        resizable: true, // Allow resizing
        alwaysOnTop: true, // Keep the app on top
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'src', 'preload.js'),
        },
    });

    mainWindow.loadFile('dist/grubla-timer/browser/index.html'); // Point to Angular's build output
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
