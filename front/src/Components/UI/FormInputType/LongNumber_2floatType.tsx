import React from 'react';

function LongNumber2FloatType({row, onBlur, onChange}) {
  function formatValue_longNumber_2float(input) {
    // Remove non-numeric and non-dot characters
    let value = input.replace(/[^0-9.]/g, '');

    // Split the value into integer and decimal parts
    const parts = value.split('.');

    // Ensure there is at most one decimal point
    if (parts.length > 2) {
      // If there are more than two parts, consider only the first two
      value = parts.slice(0, 2).join('.');
    }

    // If the decimal part has more than two digits, truncate it
    if (parts[1] && parts[1].length > 2) {
      value = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    return value;
  }


  return (<input
    {...row}
    onBlur={onBlur}

    type={"text"}
    value={row.value}
    placeholder={row.placeholder}

    maxLength={row.maxLength}
    onChange={e => {
      let value = e.target.value;

      // Remove non-numeric characters
      value = formatValue_longNumber_2float(value)

      // Continue with your logic
      onChange(value);
    }}

  />);
}

export default LongNumber2FloatType;