import React from 'react';

function DayType({row, onChange, onBlur}) {
  return <input
    type={'number'}
    onChange={e => {
      let value = e.target.value
      // Note: check value and don't let user enter irrelevant Value
      onChange(value)
    }}    onBlur={onBlur}
    value={row.value}

  />
}

export default DayType;