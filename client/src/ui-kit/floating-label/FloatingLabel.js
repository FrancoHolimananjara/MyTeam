import React, { useState } from 'react';
import "../floating-label/floatingLabel.css";

function FloatingLabel({name,type}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div class="inputBox">
        <input type={type} required="required"/>
        <span>{name}</span>
    </div>
  );
}

export default FloatingLabel;