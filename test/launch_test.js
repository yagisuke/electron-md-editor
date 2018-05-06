import { Application } from 'spectron'
import electron from 'electron'
import path from 'path'

const app = new Application({
    path: electron,
    args: [path.join(__dirname, '..')]
})

app.start()
    .then(() => app.client.getWindowCount())
    .then((count) => {
        if (count === 1) {
            console.log('success test: ')
        } else {
            console.log('failed test: ')
        }
        app.stop()
})