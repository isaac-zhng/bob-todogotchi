const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let mainWindow = null;
let bobWindow  = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 820, height: 700, minWidth: 600, minHeight: 500,
    title: 'IBM Bob Notepad',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, nodeIntegration: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
  mainWindow.on('closed', () => {
    mainWindow = null;
    if (bobWindow && !bobWindow.isDestroyed()) bobWindow.close();
  });
}

function createBobWindow() {
  if (bobWindow && !bobWindow.isDestroyed()) { bobWindow.focus(); return; }
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  bobWindow = new BrowserWindow({
    width: 220, height: 320,
    x: width - 240, y: height - 360,
    resizable: false, alwaysOnTop: true,
    frame: false, transparent: true, hasShadow: true,
    title: 'IBM Bob',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, nodeIntegration: false,
    },
  });
  bobWindow.loadFile(path.join(__dirname, 'src', 'popup.html'));
  bobWindow.on('closed', () => { bobWindow = null; });
}

ipcMain.on('open-bob-popup',  () => createBobWindow());
ipcMain.on('close-bob-popup', () => { if (bobWindow && !bobWindow.isDestroyed()) bobWindow.close(); });
ipcMain.on('state-update', (event, stateJSON) => {
  const sender = event.sender;
  if (mainWindow && !mainWindow.isDestroyed() && mainWindow.webContents !== sender)
    mainWindow.webContents.send('state-sync', stateJSON);
  if (bobWindow && !bobWindow.isDestroyed() && bobWindow.webContents !== sender)
    bobWindow.webContents.send('state-sync', stateJSON);
});
ipcMain.on('bob-move', (event, { x, y }) => {
  if (bobWindow && !bobWindow.isDestroyed()) bobWindow.setPosition(x, y);
});

app.whenReady().then(() => {
  createMainWindow();
  createBobWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createMainWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
