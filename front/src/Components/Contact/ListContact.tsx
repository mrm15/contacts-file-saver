import AggridDataShow from "../AgGridDataShow/AggridDataShow.tsx";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import Loader from "../Loader";
import DeleteButton from "../../assets/icons/deleteButton.tsx";
import EditButton from "../../assets/icons/EditButton.tsx";
import {useNavigate} from "react-router-dom";
import {PAGES} from "../../Pages/Route-string.tsx";
import {toast} from "react-toastify";
import DownloadIcon from "../../assets/icons/DownloadIcon.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import {getCurrentDate, handleDownloadContacts, makeReadyToDownloadFile} from "../../utils/utilsFunction.tsx";

function ListContact() {

    const {auth} = useAuth()
    debugger

    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(1)


    const navigateTo = useNavigate()
    const editButtonHandler = (params) => {

        const data = params.data
        navigateTo(PAGES.ADD_CONTACT, {state: {data}})
    }

    const myAxiosPrivate = useAxiosPrivate()

    const handleDeleteContact = async (phoneNumber: any) => {
        const url = 'contact/delete'

        try {
            const response = await myAxiosPrivate.post(url, {phoneNumber})
            if (response?.data) {
                toast(response?.data?.message)
                setReload(ps => ps + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteButtonHandler = async (params) => {

        const data = params.data;
        debugger
        const message = `آیا مطمئنی که میخوای مخاطب با شماره
        ${data?.phoneNumber}
        به صورت کامل برای همیشه از لیست مخاطب ها حذف کنی؟
        `
        const confirmResult1 = confirm(message)
        if (confirmResult1) {
            const message = ` برای بار دوم  عرض میکنم.  این فرآیند قابل برگشت نیست.
            آیا مطمئنی که میخوای مخاطب با شماره
        ${data?.phoneNumber}
        به صورت کامل برای همیشه از لیست مخاطب ها حذف کنی؟
        `
            const confirmResult2 = confirm(message)
            if (confirmResult2) {
                debugger
                handleDeleteContact(data.phoneNumber)
            }
        }
    }

    const myColumnDefs = [
        // Add the new column with icon and click handler
        {
            headerName: "عملیات", cellRenderer: (params) => (
                <div className={'flex flex-wrap gap-1 items-center justify-center'}>
                    <button
                        onClick={() => editButtonHandler(params)}
                    >
                        <EditButton/>
                    </button>
                    <button
                        onClick={() => deleteButtonHandler(params)}

                        className={'text-red-600'}>

                        <DeleteButton/>
                    </button>
                </div>
            ),
            cellStyle: (params) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }),
        },
        /////////////////////
        {headerName: "شماره تماس", field: "phoneNumber", hide: false},
        {headerName: "نام", field: "firstName", hide: false},
        {headerName: "نام خانوادگی", field: "lastName", hide: false},
        {headerName: "ایمیل", field: "email", hide: false},
        {headerName: "کاربر ثبت کننده", field: "user", hide: false},
        {headerName: "استان", field: "province", hide: false},
        {headerName: "شهر", field: "city", hide: false},
        {headerName: "آدرس", field: "address", hide: false},
    ]

    const [myRowData, setMyRowData] = useState([])


    useEffect(() => {


        const getList = async () => {
            const res = await myAxiosPrivate.get('contact/list')
            if (res.data) {
                setMyRowData(res.data)
                setIsLoading(false)
            }
        }

        void getList()


    }, [reload]);

    const downloadContactHandler = () => {


        const suffix = "vcf";
        const accessLevel = auth?.userInfo?.listAllContactAccess === true ? "" : "limit"
       const todayDate = getCurrentDate()
        const fileName = accessLevel + todayDate + '-مخاطبین'

        makeReadyToDownloadFile(myRowData, fileName, suffix)
    }
    return (
        <div>
            <div className={'font-bold my-3 '}>

                <div
                    className={'flex flex-wrap justify-center items-center'}
                >
                    <div> لیست مخاطبین</div>
                    <div
                        className={'flex flex-wrap justify-center items-center mx-2'}
                    >
                        {(auth?.userInfo?.exportContactAccess) &&
                          <button
                            onClick={downloadContactHandler}
                          >
                            <DownloadIcon/>
                          </button>
                        }
                    </div>
                </div>

            </div>


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