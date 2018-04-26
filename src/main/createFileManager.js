import fs from 'fs'

class FileMnager {
    saveFile(filePath, text) {
        return new Promise((resolve) => {
            fs.writeFileSync(filePath, text)
            resolve()
        })
    }

    readFile(filePath) {
        return new Promise((resolve) => {
            const text = fs.readFileSync(filePath, 'utf-8')
            resolve(text)
        })
    }
}

function createFileManager() {
    return new FileMnager()
}

export default createFileManager