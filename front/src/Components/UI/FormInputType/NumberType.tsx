import {toast} from "react-toastify";

function NumberType({onBlur, row, onChange}) {
  try {
    return (<input
      onBlur={onBlur}
      type={"number"}
      value={row.value}
      placeholder={row.placeholder}

      onChange={e => {
        let value = e.target.value
        // Note: check value and don't let user enter irrelevant Value
        onChange(value)
      }}
    />);
  } catch (error) {
    toast.error('NumberType')
    return <>{error.toString()}</>
  }
}

export default NumberType;