import React from 'react';

import './buttons.css';

//funktio, jota käytetään luokkanimien lisäämiseen
const classNames = classnames => classnames.join(" ");

//Button-komponentti, joka exportataan vakiona ja nimettynä
const Button = ({ className = "", black, white, special, round, ...props}) => {
    return (
        <button 
            type="button" 
            className={classNames([
                "button", 
                className, 
                black ? "button--black" : "",
                white ? "button--white" : "",
                special ? "button--special" : "",
                round ? "button--round": ""
            ])}
            {...props} 
        />
    );
}

export { Button as default, Button }