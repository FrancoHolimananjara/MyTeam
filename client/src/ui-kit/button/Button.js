import React from 'react';
import "../button/button.css";

function Button({name,type,icon}) {
    return (
        <button type='submit' className={type} ><i class={icon}></i> {name}</button>
    );
}

export default Button;