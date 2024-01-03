import {Key} from "react";
import {v4 as uuidV4} from "uuid";


const ControlColumns = ({columnDefs, onChange}) => {


    return (
        <div className={'w-full flex flex-wrap align-middle select-none'}>
            {columnDefs?.map((row, index: Key) => {
                const randomId = uuidV4()
                const checked = (row.hide)

                return <div key={index} className={'flex justify-center items-center mx-2'}>
                    <input className={'mx-1'} id={randomId} type="checkbox"
                           checked={!checked}
                           onChange={e => onChange(e, row)}
                    />
                    <label htmlFor={randomId}>{row.headerName}</label>
                </div>
            })}
        </div>
    );
};

export default ControlColumns;
