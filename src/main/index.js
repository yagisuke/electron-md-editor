import { app } from 'electron'
import createMainWindow from './createMainWindow'
import setAppMenu from './setAppMenu'
import showSaveAsNewFileDialog from './showSaveAsNewFileDialog'
import createFileManager from './createFileManager'

let mainWindow = null
let fileManger = null

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', (_e, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
        mainWindow = createMainWindow()
    }
})

app.on('ready', () => {
    mainWindow = createMainWindow()
    fileManger = createFileManager()
    setAppMenu({ openFile, saveFile, saveAsNewFile, exportPDF })
})

function openFile() {
    console.log('openFile')
}

function saveFile() {
    console.log('saveFile')
}

function saveAsNewFile() {
    Promise.all([showSaveAsNewFileDialog(), mainWindow.requestText()])
    .then(([filePath, text]) => fileManger.saveFile(filePath, text))
    .catch((error) => {
        console.log('[ERROR] ', error)
    })
}

function exportPDF() {
    console.log('exportPDF')
}
