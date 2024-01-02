import AggridDataShow from "../AgGridDataShow/AggridDataShow.tsx";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import Loader from "../Loader";

function ListContact() {

    const [isLoading, setIsLoading] = useState(true)


    const myColumnDefs = [
        {headerName: "شماره تماس", field: "phoneNumber"},
        {headerName: "نام", field: "firstName"},
        {headerName: "نام خانوادگی", field: "lastName"},
        {headerName: "ایمیل", field: "email"},
        {headerName: "کاربر ثبت کننده", field: "user"},
        {headerName: "استان", field: "province"},
        {headerName: "شهر", field: "city"},
        {headerName: "آدرس", field: "address"},
    ]

    const [myRowData, setMyRowData] = useState([])



    const myAxiosPrivate = useAxiosPrivate()
    const [reload, setReload] =  useState(1)
    useEffect(() => {


        const getList=async ()=>{
           const res =  await  myAxiosPrivate.get('contact/list')
            if(res.data){
                setMyRowData(res.data)
                setIsLoading(false)
            }
        }

        void getList()



        setTimeout(()=>{
           // setIsLoading(false)

        },1000)


    }, [reload]);

    return (
        <div>
            <div

                onClick={()=>{
                    setReload(ps=>ps+1)

                }}

            >لیست مخاطبین</div>

            {isLoading ? <Loader/> :
                <div>
                    <AggridDataShow
                        columnDefs={myColumnDefs}
                        rowData={myRowData}


                    />


                </div>}
        </div>
    );
}

export default ListContact;