import AggridDataShow from "../AgGridDataShow/AggridDataShow.tsx";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import Loader from "../Loader";
import DeleteButton from "../../assets/icons/deleteButton.tsx";
import EditButton from "../../assets/icons/EditButton.tsx";

function ListContact() {

    const [isLoading, setIsLoading] = useState(true)


    const myColumnDefs = [
        // Add the new column with icon and click handler
        { headerName: "عملیات", cellRenderer: (params) => (
                <div className={'flex flex-wrap gap-1 items-center'}>
                    <div>
                        <EditButton />
                    </div>
                     <div className={'text-red-600'}>
                         <DeleteButton/>
                     </div>
                </div>
            )
        },
        /////////////////////
        {headerName: "شماره تماس", field: "phoneNumber", hide: false},
        {headerName: "نام", field: "firstName", hide:false},
        {headerName: "نام خانوادگی", field: "lastName", hide:false},
        {headerName: "ایمیل", field: "email", hide:false},
        {headerName: "کاربر ثبت کننده", field: "user", hide:false},
        {headerName: "استان", field: "province", hide:false},
        {headerName: "شهر", field: "city", hide:false},
        {headerName: "آدرس", field: "address", hide:false},
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