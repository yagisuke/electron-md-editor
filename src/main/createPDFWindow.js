import { BrowserWindow } from 'electron'
import { ipcMain } from 'electron'

class PDFWindow {
    constructor(text) {
        this.window = new BrowserWindow({ show: true })
        this.window.loadURL(`file://${__dirname}/../../pdf.html`)
        ipcMain.once('REQUEST_TEXT', (e) => {
            e.returnValue = text
        })
    }
}

function createPDFWindow(content, fileManager) {
    return new PDFWindow(content, fileManager)
}

export default createPDFWindow