import React from 'react';
import "../button/button.css";

function Button({ value, type, icon, handleSubmit}) {
    return (
        <button type='submit' className={type} onClick={handleSubmit}><i class={icon}></i> {value}</button>
    );
}

export default Button;