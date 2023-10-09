const path = require('path')
const { app, BrowserWindow, Menu, nativeImage, Tray } = require('electron')
const server = require('./api/server')

if (require('electron-squirrel-startup')) {
  app.quit()
}

const isDev = process.env.IS_DEV === 'true'

let tray = null
function createTray() {
  const icon = path.join(__dirname, '/images/printer.png') // required.
  const trayicon = nativeImage.createFromPath(icon)
  tray = new Tray(trayicon.resize({ width: 16 }))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        createWindow()
      },
    },
    {
      label: 'Quit',
      click: () => {
        app.quit() // actually quit the app.
      },
    },
  ])

  tray.setContextMenu(contextMenu)
}

let mainWindow
let serverWindow

function createWindow() {
  if (!tray) {
    // if tray hasn't been created already.
    createTray()
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts'),
      nodeIntegration: true, // not cool. I'm sorry.
    },
  })

  serverWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts'),
      nodeIntegration: true, // not cool. I'm sorry.
    },
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    serverWindow.loadURL('https://localhost:3000')
  } else {
    // mainWindow.removeMenu();
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'))
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.dock.hide()
  // any other logic
})
