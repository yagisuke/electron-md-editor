import assert from 'assert'
import { JSDOM } from 'jsdom'
import createApplication from './create-application'
import EditorPage from './editor-page'

describe('エディタ入力のテスト', () => {
    let app

    beforeEach(() => {
        app = createApplication()
        return app.start()
    })
    afterEach(() => {
        return app.stop()
    })

    describe('エディタにMarkdownテキストを入力する', () => {
        it('HTMLがレンダリングされる', () => {
            const page = new EditorPage(app.client)
            return page.inputText('# h1見出し\n## h2見出し')
                .then(() => page.getRenderedHTML())
                .then((html) => {
                    const dom = new JSDOM(html).window.document

                    const h1 = dom.querySelector('h1')
                    assert.equal(h1.textContent, 'h1見出し')

                    const h2 = dom.querySelector('h2')
                    assert.equal(h2.textContent, 'h2見出し')
                })
        })
    })
})