const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path'); // Declare it once here

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
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: false,
        nodeIntegration: true,
      },
  });
  mainWindow.loadURL(`file://${__dirname}/dist/grubla-timer/browser/index.html`)
//   mainWindow.loadFile('dist/grubla-timer/browser/index.html');

  ipcMain.on('open-settings', () => {
    const popup = new BrowserWindow({
      width: 400,
      height: 300,
      parent: mainWindow,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: false,
        nodeIntegration: true,
      },
    });

    popup.loadURL(`file://${__dirname}/dist/grubla-timer/browser/index.html#/settings`)
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
