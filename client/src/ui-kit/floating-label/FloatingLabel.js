import React from 'react';
import "../floating-label/floatingLabel.css";

function FloatingLabel({name,type,setState}) {

  const handleInputChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div class="inputBox">
        <input type={type} required="required" onChange={handleInputChange}/>
        <span>{name}</span>
    </div>
  );
}

export default FloatingLabel;