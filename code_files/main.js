const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const Store = require('electron-store').default;
const store = new Store({ name: 'bob-state' });

let mainWindow = null;
let bobWindow  = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 820, height: 700, minWidth: 600, minHeight: 500,
    title: 'IBM Bob Todogotchi',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, nodeIntegration: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
  mainWindow.on('ready-to-show', () => mainWindow.setTitle('IBM Bob Todogotchi'));
  mainWindow.on('closed', () => {
    mainWindow = null;
    if (bobWindow && !bobWindow.isDestroyed()) bobWindow.close();
  });
}

function createBobWindow() {
  if (bobWindow && !bobWindow.isDestroyed()) return;
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  bobWindow = new BrowserWindow({
    width: 220, height: 320,
    x: width - 240, y: height - 360,
    resizable: false, alwaysOnTop: true,
    frame: false, transparent: true, hasShadow: true,
    focusable: false, skipTaskbar: true,
    title: 'IBM Bob',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, nodeIntegration: false,
    },
  });
  bobWindow.loadFile(path.join(__dirname, 'src', 'popup.html'));
  bobWindow.on('closed', () => {
    bobWindow = null;
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('bob-closed');
  });
}

app.whenReady().then(() => {
  // Register IPC handlers
  ipcMain.on('store-save', (_e, stateJSON) => store.set('state', stateJSON));
  ipcMain.handle('store-load', () => store.get('state', null));

  ipcMain.on('open-bob-popup',  () => createBobWindow());
  ipcMain.on('close-bob-popup', () => { if (bobWindow && !bobWindow.isDestroyed()) bobWindow.close(); });
  let lastStateJSON = null;

  ipcMain.on('state-update', (event, stateJSON) => {
    lastStateJSON = stateJSON;
    const sender = event.sender;
    if (mainWindow && !mainWindow.isDestroyed() && mainWindow.webContents !== sender)
      mainWindow.webContents.send('state-sync', stateJSON);
    if (bobWindow && !bobWindow.isDestroyed() && bobWindow.webContents !== sender)
      bobWindow.webContents.send('state-sync', stateJSON);
  });

  ipcMain.on('request-state', (event) => {
    if (lastStateJSON) event.sender.send('state-sync', lastStateJSON);
  });
  ipcMain.on('bob-move', (event, { x, y }) => {
    if (bobWindow && !bobWindow.isDestroyed()) bobWindow.setPosition(x, y);
  });

  createMainWindow();
  createBobWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createMainWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
