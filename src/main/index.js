import { app } from 'electron'
import setAppMenu from './setAppMenu'
import createMainWindow from './createMainWindow'
import createFileManager from './createFileManager'
import createPDFWindow from './createPDFWindow'
import showSaveAsNewFileDialog from './showSaveAsNewFileDialog'
import showOpenFileDialog from './showOpenFileDialog'
import showExportPDFDialog from './showExportPDFDialog'

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
    .then((text) => fileManger.overwriteFile(text))
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
    Promise.all([showExportPDFDialog(), mainWindow.requestText()])
    .then(([filePath, text]) => {
        const pdfWindow = createPDFWindow(text)

        pdfWindow.on('RENDERED_CONTENT', () => {
            pdfWindow.generatePDF()
            .then((pdf) => fileManger.writePDF(filePath, pdf))
            .then(() => pdfWindow.close())
            .catch((error) => {
                console.log('[ERROR][exportPDF][RENDERED_CONTENT] ', error)
                pdfWindow.close()
            })
        })
    })
    .catch((error) => {
        console.log('[ERROR][exportPDF] ', error)
    })
}
