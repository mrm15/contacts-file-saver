import {FC} from 'react';
import "./styles.scss"
import FormInputTypes from "./FormInputType.tsx";

interface ComponentType {
    [key: string]: FC<any>;
}

export const COMPONENT_TYPE: ComponentType = {
    // Assuming FormInputTypes contains the components
    "string": FormInputTypes.StingType,
    "input": FormInputTypes.Input,
    "number": FormInputTypes.NumberType,
    "longNumber": FormInputTypes.LongNumberType,
    "longNumber+2float": FormInputTypes.LongNumber_2floatType,
    "smallNumber": FormInputTypes.SmallNumberType,
    "smallFloat": FormInputTypes.SmallFloatType,
    "longFloat": FormInputTypes.LongFloatType,
    "date": FormInputTypes.DateType,
    "time": FormInputTypes.TimeType,
    "mobile": FormInputTypes.MobileType,
    "telephone": FormInputTypes.TelephoneType,
    "email": FormInputTypes.EmailType,
    "price": FormInputTypes.PriceType,
    "color": FormInputTypes.ColorType,
    "year": FormInputTypes.YearType,
    "month": FormInputTypes.MonthType,
    "day": FormInputTypes.DayType,
    "selectBox": FormInputTypes.SelectBoxType,
    "cashBox": FormInputTypes.CashBoxType,
    "rlookup": FormInputTypes.RLookupType,
    "file": FormInputTypes.FileType,
    "textarea": FormInputTypes.TextareaType,//
    "computed": FormInputTypes.Computed,//
    "editor": FormInputTypes.Editor,//
    // اگه در آینده بک اند تایپ جدیدی اضفه کرد باید اینجا اضفه کنیم و کامپوننت خودشو اضافه کنیم
};

const DynamicFormInputs = ({row, onChange, onBlur}) => {


    const CustomInput = COMPONENT_TYPE[row.type]


    return (
        <div className={'div__group__input_select'}>
            <label htmlFor="">{row.label}</label>
            <CustomInput
                row={row}
                onChange={onChange}
                onBlur={onBlur}
            />


        </div>
    );
};

export default DynamicFormInputs;
