import assert from 'assert'
import createApplication from './createApplication.test'

describe('アプリケーションの起動のテスト', () => {
    let app

    beforeEach(() => {
        app = createApplication()
        return app.start()
    })
    afterEach(() => {
        return app.stop()
    })

    it('アプリケーションをきどうするとwindowが1つ表示される', () => {
        return app.client.getWindowCount()
            .then(count => assert.equal(count, 1))
    })
})
