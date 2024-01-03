function TelephoneType({row, onBlur, onChange}) {
  return (<input
    {...row}
    onBlur={onBlur}

    type={"text"}
    value={row.value}
    placeholder={row.placeholder}

    maxLength={row.maxLength}
    onChange={e => {
      let value = e.target.value;

      // if (value.length === 1 && value !== '0') {
      //   changeValueHandler(index, 'errorMessage', 'شماره تلفن باید با صفر شروع شود.')
      //   return
      // }

      // if (value.length === 2 && value !== '09') {
      //   toast.error('شماره تلفن باید با 09 شروع شود.');
      //   changeValueHandler(index, 'errorMessage', 'شماره تلفن باید با 09 شروع شود.')
      //   return
      // }

      // Remove non-numeric characters
      value = value.replace(/[^0-9]/g, '');

      // Further validation or formatting if needed
      // For example, you can limit the length of the phone number
      // if (value.length !== 11) {
      //   changeValueHandler(index, 'errorMessage', 'شماره تلفن فقط باید یازده رقم داشته باشد')
      // }
      // if (value.length === 11 && value[0] === '0' && value[1] === '9') {
      //   changeValueHandler(index, 'errorMessage', '')
      //
      // }

      // Continue with your logic
      onChange(value);
    }}

  />);
}

export default TelephoneType;