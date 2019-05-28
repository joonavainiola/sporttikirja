import React from 'react';
import './Content.css';

function Content(props) {

    /**
     * props.children näyttää sisällön,
     * mitä komponentin alku- ja sulku-tagien sisään annetaan
     */
    return (
        <div className="content">
            {props.children}
        </div>
    )
}

export default Content;