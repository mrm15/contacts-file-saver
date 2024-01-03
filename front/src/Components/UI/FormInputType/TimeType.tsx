function TimeType({
                    row, onChange, onBlur
                  }) {

  return (<input
    //{...row}
    type="time"
    step={"1"}
    onChange={(e) => {
      onChange(e.target.value)
    }}
    onBlur={onBlur}
    value={row.value}
  />);
}

export default TimeType;