function LongFloatType({row,onChange,onBlur}) {
  return <input
    type={'text'}
    onChange={e => {
      let value = e.target.value
      // Note: check value and don't let user enter irrelevant Value
      onChange(value)
    }}    onBlur={onBlur}
    value={row.value}
  />
}

export default LongFloatType;