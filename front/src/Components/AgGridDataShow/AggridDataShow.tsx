import {useCallback, useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ControlColumns from "./ControlColumns.tsx"; // Optional theme CSS

const MyGridComponent = (props) => {

    const {columnDefs, rowData} = props
    const [myColumnDefs, setMyColumnDefs] = useState(columnDefs);

    const [myRowData] = useState(rowData);

    const onBodyScroll = useCallback((event) => {
        console.log("Scroll Event: ", event);
        // Implement your custom logic here
    }, []);

    const persianLocale = {
        // For example:
        page: 'صفحه',
        more: 'بیشتر',
        to: 'تا',
        of: 'از',
        next: 'بعدی',
        last: 'آخرین',
        first: 'اولین',
        previous: 'قبلی',
        loadingOoo: 'در حال بارگذاری...',

        // Other translations go here
    };

    const changeColumnDefsControl = (e, selectedColRow) => {

        debugger
        const newValue = e.target.checked
        const newCols = myColumnDefs.map((v: any) => {
            const row = {...v}
            if (row.field === selectedColRow.field) {
                row.hide = !newValue
            }
            return row
        })

        setMyColumnDefs(newCols)
    }
    return (
        <div className="ag-theme-alpine" style={{height: "60vh", width: '80vw', direction: 'rtl'}}
        >
            <AgGridReact

                columnDefs={myColumnDefs}
                rowData={myRowData}
                onBodyScroll={onBodyScroll}
                localeText={persianLocale}
                pagination={true}
                paginationPageSize={10}
                enableRtl={true}
                defaultColDef={{
                    flex: 1,
                    minWidth: 100,
                    filter: true
                }}


            />
            <div>
                <ControlColumns
                    columnDefs={myColumnDefs}
                    onChange={changeColumnDefsControl}
                />
            </div>
        </div>
    );
};

export default MyGridComponent;
