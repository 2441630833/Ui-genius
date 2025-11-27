const { app, BrowserWindow, shell, Menu } = require('electron');
const { session } = require('electron');
const path = require('path');
const fs = require('fs');

// Create application menu
function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    },
    // {
    //   label: 'Edit',
    //   submenu: [
    //     { role: 'undo' },
    //     { role: 'redo' },
    //     { type: 'separator' },
    //     { role: 'cut' },
    //     { role: 'copy' },
    //     { role: 'paste' }
    //   ]
    // },
    // {
    //   label: 'View',
    //   submenu: [
    //     { role: 'reload' },
    //     { role: 'forceReload' },
    //     { role: 'toggleDevTools' },
    //     { type: 'separator' },
    //     { role: 'resetZoom' },
    //     { role: 'zoomIn' },
    //     { role: 'zoomOut' },
    //     { type: 'separator' },
    //     { role: 'togglefullscreen' }
    //   ]
    // },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Uigenius',
          click: async () => {
            const { dialog } = require('electron');
            await dialog.showMessageBox({
              type: 'info',
              title: 'About Uigenius',
              message: 'Uigenius v1.0.6',
              detail: 'AI-powered UX/UI design tool for rapid prototyping and design generation'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Set a fixed user data path to persist localStorage
const userDataPath = path.join(app.getPath('appData'), 'Uigenius');
app.setPath('userData', userDataPath);
console.log('User data path set to:', userDataPath);
console.log('App data directory:', app.getPath('appData'));

function createMainWindow(startUrl) {
  // 配置持久化会话
  const ses = session.fromPartition('persist:uigenius');
  
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      // not open sandbox , use default sandbox
      // sandbox: false,
      webSecurity: false,
      partition: 'persist:uigenius',
      session: ses
    }
  });

  mainWindow.loadURL(startUrl);
  
  // 添加调试信息
  mainWindow.webContents.on('dom-ready', () => {
    console.log('DOM ready, URL:', mainWindow.webContents.getURL());
    // 注入调试脚本
    mainWindow.webContents.executeJavaScript(`
      console.log('localStorage test - before:', localStorage.length);
      localStorage.setItem('electron_debug_test', Date.now());
      console.log('localStorage test - after:', localStorage.length);
      console.log('All localStorage keys:', Object.keys(localStorage));
    `);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url: targetUrl }) => {
    shell.openExternal(targetUrl);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createMenu(); // Add this line
  
  createMainWindow('https://uigenius.top');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow('https://uigenius.top');
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});