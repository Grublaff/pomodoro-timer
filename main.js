const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 240,
    height: 60,
    frame: false, // No default window frame
    transparent: true, // Allow transparency
    resizable: true, // Allow resizing
    alwaysOnTop: true, // Keep the app on top,
    devTools: true, // Disable DevTools
    hasShadow: false, // Remove window shadow
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
      },
  });
  mainWindow.loadURL(`file://${__dirname}/dist/grubla-timer/browser/index.html`)
});

ipcMain.on('resize-window', (event, width, height) => {
  let browserWindow = BrowserWindow.fromWebContents(event.sender)
  browserWindow.setSize(width,height)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
