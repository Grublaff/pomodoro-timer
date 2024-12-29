const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 240,
    height: 60,
    frame: false,
    transparent: true,
    resizable: true,
    alwaysOnTop: true,
    devTools: true,
    hasShadow: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  const indexPath = `file://${path.join(__dirname, 'dist', 'pomodoro-timer', 'browser', 'index.html')}#/timer`;
  console.log('Loading URL:', indexPath);

  mainWindow.loadURL(indexPath).catch((err) => {
    console.error('Failed to load URL:', err);
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error(`Failed to load ${validatedURL}: ${errorDescription} (${errorCode})`);
  });
}

const settingsPath = path.join(app.getPath('userData'), 'settings.json');

ipcMain.handle('get-settings', async () => {
  try {
    if (!fs.existsSync(settingsPath)) {
      // Create the settings file with default values if it doesn't exist
      const defaultSettings = { workMinutes: 25, workSeconds: 0, breakMinutes: 5, breakSeconds: 0 };
      fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    const data = fs.readFileSync(settingsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading settings file:', error);
    return { workMinutes: 25, workSeconds: 0, breakMinutes: 5, breakSeconds: 0 }; // Default settings
  }
});

ipcMain.on('save-settings', (event, settings) => {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings));
    mainWindow.webContents.send('settings-saved', settings);
    } catch (error) {
    console.error('Error writing settings file:', error);
  }
});

ipcMain.on('resize-window', (event, width, height) => {
  let browserWindow = BrowserWindow.fromWebContents(event.sender)
  browserWindow.setSize(width,height)
})

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});