import {forwardRef} from "react";
import MyPrint from "./MyPrint.tsx";

export const ComponentToPrint = forwardRef((props, ref) => {
    console.log(props.data)
    return <div ref={ref} className={"factorMohsen"}>
        <MyPrint data={props.data}/>
    </div>

})
