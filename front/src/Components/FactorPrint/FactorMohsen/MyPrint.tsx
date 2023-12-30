import React, {useEffect, useState} from 'react';
import {addRowIdtoTable} from "../../../utils/utilsFunction.tsx";
import PrintPageHeader from "./PrintPageHeader.tsx";
import PrintPageBody from "./PrintPageBody.tsx";
import PrintPageFooter from "./PrintPageFooter.tsx";
import {v4 as uuidV4} from 'uuid';

import "./style.scss";

function MyPrint(props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    console.log(props.data)

    const ROWS_PER_PAGE = 20;
    const [allPages, setAllPages] = useState([])


    useEffect(() => {
        let counter = 0;
        let data = {...props.data}

        if (data?.tableData) {
            data.tableData = addRowIdtoTable(data.tableData)
            console.log(data)
            const allPageArray = []


            for (let i = 0; i < data?.tableData?.length; i = i + ROWS_PER_PAGE) {
                let singlePage = [];
                for (let j = 0; j < ROWS_PER_PAGE; j++) {
                    if (!data?.tableData[i + j]) break
                    singlePage.push(data?.tableData[i + j])
                }
                allPageArray.push(singlePage)
            }
            // while (counter < data?.tableData?.length) {
            //     singlePage=[]
            //     for (let i = 0; i < ROWS_PER_PAGE; i++) {
            //         if (!data.tableData[counter+i]) break
            //         singlePage.push(data.tableData[counter+i])
            //         counter++
            //     }
            //     allPageArray.push(singlePage)
            // }
            //console.log(allPageArray)
            setAllPages(allPageArray)
        }

    }, [props.data]);

    try {
        return (
            <>
                {allPages.map((singePageArray, index) => {

                    const key = uuidV4()
                    return <div key={key}>
                        <PrintPageHeader currentPage={index + 1} totalPages={allPages.length} propsData={props.data}/>
                        <PrintPageBody propsData={props.data} data={singePageArray}/>
                        <PrintPageFooter propsData={props.data}/>
                    </div>
                })}
            </>

        );
    } catch (error) {
        return <>{error.toString()}</>
    }

}

export default MyPrint;


