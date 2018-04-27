import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import Previewer from './Previewer'

class PDFUI extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }
    }

    componentDidMount() {
        const text = ipcRenderer.sendSync('REQUEST_TEXT')
        this.setState({ text })
    }

    componentDidUpdate() {
        this.syncImageRendered().then(() => {
            ipcRenderer.send('RENDERED_CONTENT')
        })
    }

    syncImageRendered() {
        const images = Array.prototype.slice.call(document.querySelectorAll('img'))
        const loadingImages = images.filter((image) => !image.complete)

        if (loadingImages.length === 0) {
            return Promise.resolve()
        }

        return Promise.all(loadingImages.map((image) => new Promise((resolve) => image.onload = () => resolve())))
    }

    render() {
        return(
            <Previewer value={this.state.text} />
        )
    }
}

export default PDFUI