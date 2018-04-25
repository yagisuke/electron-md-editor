import React, { Component } from 'react'
import style from './Editor.css'

function Editor(props) {
    return(
        <textarea
            id='editor'
            className={`${props.className} ${style.editor}`}
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export default Editor