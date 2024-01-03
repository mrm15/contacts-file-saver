function SelectBoxType({
                          row, onChange, onBlur
                       }) {
  try {
    return (<select
      {...row}
      onBlur={onBlur}
      value={(row?.value)}
      onChange={e=>onChange(e.target.value)}
    >
      <option value="">انتخاب کنید</option>
      {row?.options?.map((v, index) => <option key={index} value={v}>{v}</option>)}
    </select>);
  } catch (error) {
    return <>{error.toString()}</>
  }
};

export default SelectBoxType;
