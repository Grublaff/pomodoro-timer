const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  },
});
