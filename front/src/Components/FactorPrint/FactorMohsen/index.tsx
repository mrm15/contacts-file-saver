// function Index(props) {
//
//     return (
//         <div>
//             فاکتور محسن اینجاست:
//             {data.title}
//         </div>
//     );
// }
//
// export default Index;

 import React, {useRef} from 'react';
import {useReactToPrint} from 'react-to-print';

import {ComponentToPrint} from './ComponentToPrint';

 const Index = (props) => {

     //console.log(props.data)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div>
            <ComponentToPrint ref={componentRef} data={props.data}/>
            <button id={'singlePrintInPage'} onClick={handlePrint}
            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}
            >چاپ فاکتور</button>
        </div>
    );
};

 export default Index