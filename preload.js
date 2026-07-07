const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  openBobPopup:   () => ipcRenderer.send('open-bob-popup'),
  closeBobPopup:  () => ipcRenderer.send('close-bob-popup'),
  broadcastState: (stateJSON) => ipcRenderer.send('state-update', stateJSON),
  onStateSync:    (cb) => ipcRenderer.on('state-sync', (_e, json) => cb(json)),
  moveBobWindow:  (x, y) => ipcRenderer.send('bob-move', { x, y }),
  isElectron: true,
});
