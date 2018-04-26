import { dialog } from 'electron'
import { resolve } from 'dns';

function showOpenFileDialog() {
    return new Promise((resolve, reject) => {
        const files = dialog.showOpenDialog({
            title: 'open',
            properties: ['openFile'],
            filters: [
                {
                    name: 'markdown file',
                    extensions: ['md']
                }
            ]
        })

        if (files && files.length > 0) {
            resolve(files[0])
        } else {
            reject()
        }
    })
}

export default showOpenFileDialog