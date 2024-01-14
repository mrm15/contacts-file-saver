import AggridDataShow from "../AgGridDataShow/AggridDataShow.tsx";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import Loader from "../Loader";
import DeleteButton from "../../assets/icons/DeleteButton.tsx";
import EditButton from "../../assets/icons/EditButton.tsx";
import {useNavigate} from "react-router-dom";
import {PAGES} from "../../Pages/Route-string.tsx";
import {toast} from "react-toastify";


function ListUsers() {


    const CheckboxRenderer = (params) => {
        const handleCheckboxClick = (e) => {
            e.stopPropagation();
            console.log("Checkbox clicked:", params.data);
            // Additional logic
        };

        try {
            return (
                <input
                    type="checkbox"
                    checked={params.value}
                    onClick={handleCheckboxClick}
                />
            );
        } catch (error) {
            return <>{error.toString()}</>
        }
    };


    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(1)


    const navigateTo = useNavigate()
    const editButtonHandler = (params) => {

        const data = params.data
        navigateTo(PAGES.ADD_USER, {state: {data}})
    }

    const myAxiosPrivate = useAxiosPrivate()

    const handleDeleteUser = async (phoneNumber: any) => {
        const url = 'users/delete'

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
        const message = `آیا مطمئنی که میخوای کاربر با شماره
        ${data?.phoneNumber}
        به صورت کامل برای همیشه از لیست کاربر ها حذف کنی؟
        `
        const confirmResult1 = confirm(message)
        if (confirmResult1) {
            const message = ` برای بار دوم  عرض میکنم.  این فرآیند قابل برگشت نیست.
            آیا مطمئنی که میخوای کاربر با شماره
        ${data?.phoneNumber}
        به صورت کامل برای همیشه از لیست کاربر ها حذف کنی؟
        `
            const confirmResult2 = confirm(message)
            if (confirmResult2) {
                debugger
                await handleDeleteUser(data.phoneNumber)
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
            cellStyle: () => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }),
        },
        /////////////////////
        {headerName: "شماره تماس", field: "phoneNumber", minWidth: 150, hide: false},
        {headerName: "نام", field: "name", minWidth: 150, hide: false},
        {headerName: "دسترسی به مخاطبین", field: "addContactAccess", hide: false, cellRenderer: CheckboxRenderer},
        {
            headerName: "ویرایش مخاطبین",
            field: "editContactAccess",
            minWidth: 150,
            hide: false,
            cellRenderer: CheckboxRenderer
        },
        {headerName: "حذف مخاطبین", field: "deleteContactAccess", hide: false, cellRenderer: CheckboxRenderer},
        {headerName: "مشاهده مخاطبین", field: "listAllContactAccess", hide: false, cellRenderer: CheckboxRenderer},
        {headerName: "مشاهده مخاطبین خودش", field: "listOwnContactAccess", hide: false, cellRenderer: CheckboxRenderer},
        {
            headerName: "خروجی گرفتن از مخاطبین",
            field: "exportContactAccess",
            hide: false,
            cellRenderer: CheckboxRenderer
        },
        {headerName: "افزودن کاربر", field: "addUserAccess", hide: false, cellRenderer: CheckboxRenderer},
        {headerName: "حذف کاربر", field: "deleteUserAccess", hide: false, cellRenderer: CheckboxRenderer},
        {headerName: "ویرایش کاربر", field: "editUserAccess", hide: false, cellRenderer: CheckboxRenderer},
        {headerName: "مشاهده لیست کاربر", field: "listUserAccess", hide: false, cellRenderer: CheckboxRenderer},
    ]

    const [myRowData, setMyRowData] = useState([])


    useEffect(() => {


        const getList = async () => {
            const res = await myAxiosPrivate.get('users/list')
            if (res.data) {
                setMyRowData(res.data)
                setIsLoading(false)
            }
        }

        void getList()


    }, [reload]);

    const onCellClicked = (params) => {
        console.log(params.data)
    }
    try {
        return (
            <div>
                <div className={'font-bold my-3 '}>

                    <div
                        className={'flex flex-wrap justify-center items-center'}
                    >
                        <div> لیست کاربران</div>
                        <div
                            className={'flex flex-wrap justify-center items-center mx-2'}
                        >

                        </div>
                    </div>

                </div>


                {isLoading ? <Loader/> :
                    <div>
                        <AggridDataShow
                            columnDefs={myColumnDefs}
                            rowData={myRowData}
                            onCellClicked={onCellClicked}


                        />


                    </div>}
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default ListUsers;