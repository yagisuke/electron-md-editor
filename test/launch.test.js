import { Application } from 'spectron'
import electron from 'electron'
import path from 'path'
import assert from 'assert'

const app = new Application({
    path: electron,
    args: [path.join(__dirname, '..')]
})

describe('アプリケーションの起動のテスト', function() {
    this.timeout(10000)
    beforeEach(function() {
        return app.start()
    })
    afterEach(function() {
        return app.stop()
    })

    it('アプリケーションをきどうするとwindowが1つ表示される', function() {
        return app.client.getWindowCount()
            .then(count => assert.equal(count, 1))
    })
})
