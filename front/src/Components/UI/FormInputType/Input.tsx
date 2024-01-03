function StingType(props) {
  const {
     row, onChange, onBlur
  } = props


  try {
    return (<input
     // {...row}
      // autoFocus
      onBlur={onBlur}

      type={"text"}
      value={row?.value}
      placeholder={row.placeholder}

      //maxLength={Math.floor(row.maxLength + (row.maxLength / 3))} // این میتونه دقیق تر و بهتر هم باشه
      onChange={e => {
        let value = e.target.value;
        onChange(value)
      }}
    />);
  } catch (error) {
    return <>{error?.toString()}</>
  }
}

export default StingType;

