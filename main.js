const { app, BrowserWindow, ipcMain } = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 240,
    height: 60,
    frame: false, // No default window frame
    transparent: false, // Allow transparency
    resizable: true, // Allow resizing
    alwaysOnTop: true, // Keep the app on top,
    devTools: true, // Disable DevTools
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
      },
  });
  mainWindow.loadURL(`file://${__dirname}/dist/grubla-timer/browser/index.html`)
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
