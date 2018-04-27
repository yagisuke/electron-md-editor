import { BrowserWindow } from 'electron'
import { ipcMain } from 'electron'
import EventEmitter from 'events'

class PDFWindow extends EventEmitter {
    constructor(text) {
        super(text)

        this.window = new BrowserWindow({ show: false })
        this.window.loadURL(`file://${__dirname}/../../pdf.html`)
        
        ipcMain.once('REQUEST_TEXT', (e) => {
            e.returnValue = text
        })

        ipcMain.once('RENDERED_CONTENT', () => {
            this.emit('RENDERED_CONTENT')
        })
    }

    generatePDF() {
        return new Promise((resolve, reject) => {
            this.window.webContents.printToPDF({}, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(data)
                }
            })
        })
    }

    close() {
        this.window.close()
        this.window.on('closed', () => {
            this.window = null
        })
    }
}

function createPDFWindow(content, fileManager) {
    return new PDFWindow(content, fileManager)
}

export default createPDFWindow