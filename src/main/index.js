import { app } from 'electron'
import createMainWindow from './createMainWindow'
import setAppMenu from './setAppMenu'
import createFileManager from './createFileManager'
import showSaveAsNewFileDialog from './showSaveAsNewFileDialog'
import showOpenFileDialog from './showOpenFileDialog'

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
    showOpenFileDialog()
    .then((filePath) => fileManger.readFile(filePath))
    .then((text) => mainWindow.sendText(text))
    .catch((error) => {
        console.log('[ERROR][openFile] ', error)
    })
}

function saveFile() {
    if (!fileManger.filePath) {
        saveAsNewFile()
        return
    }

    mainWindow.requestText()
    .this((text) => fileManger.overwriteFile(text))
    .catch((error) => {
        console.log('[ERROR][saveFile] ', error)
    })
}

function saveAsNewFile() {
    Promise.all([showSaveAsNewFileDialog(), mainWindow.requestText()])
    .then(([filePath, text]) => fileManger.saveFile(filePath, text))
    .catch((error) => {
        console.log('[ERROR][saveAsNewFile] ', error)
    })
}

function exportPDF() {
    console.log('exportPDF')
}
