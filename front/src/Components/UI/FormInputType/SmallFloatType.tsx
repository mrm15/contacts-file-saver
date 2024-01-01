import React from 'react';

function SmallFloatType({row,onChange,onBlur}) {
  return (<input
    {...row}
    onBlur={onBlur}

    type={"text"}
    value={row.value}
    placeholder={row?.placeholder}

    maxLength={row.maxLength}
    onChange={e => {


      debugger
      let value = e.target.value;
      // بک اند گفت که باید این مورد ینی
      //smallFloat
      // فقط تا دو رقم اعشار وارد کنه
      if (value.includes('.')) {
        // If it does, truncate or pad the decimal part to ensure two digits after the period
        const parts = value.split('.');
        value = parts[0] + (parts[1] ? `.${parts[1].slice(0, 2)}` : '.');
      }
      onChange(value)
    }}
  />);
}

export default SmallFloatType;