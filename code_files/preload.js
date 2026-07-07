const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  openBobPopup:   () => ipcRenderer.send('open-bob-popup'),
  closeBobPopup:  () => ipcRenderer.send('close-bob-popup'),
  broadcastState: (stateJSON) => ipcRenderer.send('state-update', stateJSON),
  requestState:   () => ipcRenderer.send('request-state'),
  onStateSync:    (cb) => ipcRenderer.on('state-sync', (_e, json) => cb(json)),
  onBobClosed:    (cb) => ipcRenderer.on('bob-closed', () => cb()),
  moveBobWindow:  (x, y) => ipcRenderer.send('bob-move', { x, y }),
  storeSave:      (stateJSON) => ipcRenderer.send('store-save', stateJSON),
  storeLoad:      () => ipcRenderer.invoke('store-load'),
  isElectron: true,
});
