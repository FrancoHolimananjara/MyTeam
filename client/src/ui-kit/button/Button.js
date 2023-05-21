import React from 'react';
import "../button/button.css";

function Button({ name, type, icon, handleSubmit}) {
    return (
        <button type='submit' className={type} onClick={handleSubmit}><i class={icon}></i> {name}</button>
    );
}

export default Button;