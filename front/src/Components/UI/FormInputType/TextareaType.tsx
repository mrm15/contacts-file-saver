function TextareaType({onChange, onBlur,row}) {
  return (<textarea
    {...row}
    onBlur={onBlur}

    value={row.value}
    onChange={e => onChange(e.target.value)}
  ></textarea>);
}

export default TextareaType;