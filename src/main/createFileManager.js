import fs from 'fs'

class FileMnager {
    saveFile(filePath, text) {
        return new Promise((resolve) => {
            fs.writeFileSync(filePath, text)
            resolve()
        })
    }
}

function createFileManager() {
    return new FileMnager()
}

export default createFileManager