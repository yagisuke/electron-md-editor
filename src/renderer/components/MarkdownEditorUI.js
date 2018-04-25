import React, { Component } from 'react'
import Editor from './Editor'
import style from './MarkDownEditorUI.css'

class MarkDownEditorUI extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }

        this.onChangeText = this.onChangeText.bind(this)
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        return (
            <div className={style.markdownEditor}>
                <h1>Hello, Markdown Editor</h1>
                <Editor
                    className={style.editorArea}
                    value={this.state.text}
                    onChange={this.onChangeText}
                />
                <p className={style.previewArea}>
                    <i>{this.state.text}</i>
                </p>
            </div>
        )
    }
}

export default MarkDownEditorUI