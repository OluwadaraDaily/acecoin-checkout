import './Input.scss'

import React, { forwardRef } from 'react'

const InputComponent = forwardRef(function Input({ type = "text", value = "", handleInputChange, inputName, maxLength = 10000, placeholder, style, readOnly = false }, ref) {
  return (
    <input
      type={type}
      ref={ref}
      value={value}
      onChange={(event) => handleInputChange(event, { inputName })}
      maxLength={maxLength}
      placeholder={placeholder}
      className='app-input'
      style={style}
      readOnly={readOnly}
    />
  )
});

export default InputComponent