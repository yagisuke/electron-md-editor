import React, { Component } from 'react'
import marked from 'marked'
import style from './Previewer.css'


function Previewer(props) {
    return (
        <div
            id='previewer'
            className={`${props.className} ${style.previewer}`}
        >
            <span
                dangerouslySetInnerHTML={{ __html: marked(props.value)} }
            />
        </div>
    )
}

export default Previewer