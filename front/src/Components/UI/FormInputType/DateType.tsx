import React, {useEffect, useRef} from 'react';
import numeric from "../../../utils/NumericFunction";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

const FormDatePicker = (props) => {

  const {row, onChange, onBlur} = props

  const dateCal = useRef()
  useEffect(() => {


    const handleBlur = () => {

      // onblurHandler(id, row)
    }
    const handleKeyDown = (event) => {
      if (event?.keyCode === 9) {
        dateCal?.current?.closeCalendar();
      }
    };

    dateCal?.current?.addEventListener("keydown", handleKeyDown);
    // dateCal?.current?.addEventListener("focusout", handleBlur);

    // Cleanup function
    return () => {
      dateCal?.current?.removeEventListener("keydown", handleKeyDown);
      // dateCal?.current?.removeEventListener("focusout", handleBlur);

    };
  }, [dateCal]);


  return (<div onBlur={onBlur}>
    <DatePicker
      ref={dateCal}
      {...row}

      onChange={(date) => {


        if (date) {
          const newValue = numeric.p2e(date.toLocaleString())
          onChange(newValue)

          // تاریخ رو همینجا ولیدیت میکنم چون آن بلر اینجا فایر نمیشه
          // changeValueHandler(id, 'errorMessage', '')

        } else {
          onChange('')

          // تاریخ رو همینجا ولیدیت میکنم چون آن بلر اینجا فایر نمیشه
          if (row.required) {
            // changeValueHandler(id, 'errorMessage', 'تاریخ اجباری است.')
          }


        }
      }}
      calendar={persian}
      placeholder="تاریخ"
      locale={persian_fa}
      value={row.value}
      calendarPosition="bottom-right"
      hideOnScroll


    />
  </div>);
};

export default FormDatePicker;
