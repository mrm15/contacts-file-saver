import React from 'react';

function ColorType({row, onChange, onBlur}) {
  return <input
    type={'color'}
    onChange={e => {
      let value = e.target.value
      // Note: check value and don't let user enter irrelevant Value
      onChange(value)
    }}
    onBlur={onBlur}
    value={row.value}
  />
}

export default ColorType;