import React from 'react';
import {formatToPersianAddComma, parseToEnRemoveComma} from "../../../utils/CommaSeparator";
import NumericFunction from "../../../utils/NumericFunction";
import numeric from "../../../utils/NumericFunction";

function PriceType({row, onBlur, onChange}) {

  const formatNumber = (value) => {
    if (row.value === '') {
      return ''
    }
    const newValueNumber = +value
    const newValueNumberSeperated = newValueNumber.toLocaleString()
    const persianFormat = numeric.e2p(newValueNumberSeperated)

    return persianFormat
  }

  return <input
    onBlur={onBlur}
    type={"text"}
    value={formatNumber(row.value)}
    placeholder={row.placeholder}
    onChange={e => {
      let value = e.target.value;
      console.log(value)
      value = parseToEnRemoveComma(value)
      // چک کردن ماکز لنگث
      if (row?.maxLength && value.length > row.maxLength) {
        return
      }

      let numericRegex = /^(\d+)?$/;
      if (numericRegex.test(value)) {
        onChange(value)
      }
    }}
  />
}

export default PriceType;