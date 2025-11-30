const { app, BrowserWindow, shell, Menu } = require('electron');
const { session } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');
let server;

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
    //     { role: 'toggleDevTools' },
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
              message: 'Uigenius v1.1.3',
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

// 找到 H5 应用的根目录
function resolveWebAppPath() {
  const candidates = [
    path.resolve(__dirname, '..', 'unpackage', 'dist', 'build', 'web'),
    path.resolve(__dirname, '..', 'dist', 'build', 'h5'),
    path.resolve(__dirname, '..', 'dist', 'h5'),
    path.resolve(__dirname, '..', 'unpackage', 'dist', 'build', 'h5'),
    path.resolve(__dirname, '..', 'unpackage', 'dist', 'h5')
  ];
  for (const p of candidates) {
    if (fs.existsSync(p) && fs.existsSync(path.join(p, 'index.html'))) {
      return p;
    }
  }
  return null;
}

// 启动本地服务器
function startLocalServer(webAppPath, callback) {
  const FIXED_PORT = 38290; // 使用固定端口确保存储持久化
  
  server = http.createServer((req, res) => {
    // 解析 URL，移除查询参数
    const parsedUrl = url.parse(req.url);
    const sanitizedUrl = parsedUrl.pathname.replace(/\/$/, ''); // 移除末尾的斜杠
    const filePath = path.join(webAppPath, sanitizedUrl === '' ? 'index.html' : sanitizedUrl);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // 如果找不到文件（history模式），就返回 index.html
        fs.readFile(path.join(webAppPath, 'index.html'), (err2, indexData) => {
          if (err2) {
            res.writeHead(500);
            res.end('Error loading index.html');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexData);
          }
        });
      } else {
        const ext = path.extname(filePath);
        const mimeTypes = {
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.html': 'text/html',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.svg': 'image/svg+xml',
          '.eot': 'application/vnd.ms-fontobject',
          '.ttf': 'font/ttf',
          '.woff': 'font/woff',
          '.woff2': 'font/woff2'
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(data);
      }
    });
  }).listen(FIXED_PORT, 'localhost', (err) => {
    if (err) {
      console.error(`Failed to start server on port ${FIXED_PORT}:`, err);
      // 如果固定端口被占用，尝试其他端口
      server.listen(0, 'localhost', () => {
        const port = server.address().port;
        console.log(`Fixed port ${FIXED_PORT} unavailable, using port ${port}`);
        callback(`http://localhost:${port}`);
      });
    } else {
      console.log(`Local server running at http://localhost:${FIXED_PORT}`);
      callback(`http://localhost:${FIXED_PORT}`);
    }
  });
}

function createMainWindow(startUrl) {
  // 配置持久化会话
  const ses = session.fromPartition('persist:uigenius');
  
  // 设置会话持久化路径
  console.log('Session path:', ses.getStoragePath());
  
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
  
  const webAppPath = resolveWebAppPath();
  if (!webAppPath) {
    const errorWindow = new BrowserWindow({ width: 800, height: 200, autoHideMenuBar: true });
    const html = '<!doctype html><html><body><h2>H5 Build Output Not Found</h2><p>Please build H5 to <code>dist/build/h5</code> or <code>unpackage/dist/build/h5</code> before running Electron.</p></body></html>';
    errorWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
    return;
  }

  startLocalServer(webAppPath, (url) => {
    createMainWindow(url);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      // 重新启动服务器和窗口
      const webAppPath = resolveWebAppPath();
      if (webAppPath) {
        startLocalServer(webAppPath, (url) => {
          createMainWindow(url);
        });
      }
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (server) {
    server.close();
  }
});