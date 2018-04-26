import { ipcRenderer } from 'electron'
import React, { Component } from 'react'
import Editor from './Editor'
import Previewer from './Previewer'
import style from './MarkDownEditorUI.css'

class MarkDownEditorUI extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }

        this.onChangeText = this.onChangeText.bind(this)
    }

    componentDidMount() {
        ipcRenderer.on('REQUEST_TEXT', () => {
            ipcRenderer.send('REPLY_TEXT', this.state.text)
        })
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners()
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        return (
            <div className={style.markdownEditor}>
                <Editor
                    className={style.editorArea}
                    value={this.state.text}
                    onChange={this.onChangeText}
                />
                <Previewer
                    className={style.previewArea}
                    value={this.state.text}
                />
            </div>
        )
    }
}

export default MarkDownEditorUI