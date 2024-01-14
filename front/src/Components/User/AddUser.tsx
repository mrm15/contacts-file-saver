import {Formik, Form, Field, FormikState} from 'formik';
import * as Yup from 'yup';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {toast} from "react-toastify";
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Loader from "../Loader";
import {MODES} from "../CONSTANTS/consts.tsx";

// Validation schema
const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('شماره اجباری'),
    name: Yup.string().required('نام کاربر اجباری'),
    addContactAccess: Yup.boolean().required('Required'),
    editContactAccess: Yup.boolean().required('Required'),
    deleteContactAccess: Yup.boolean().required('Required'),
    listAllContactAccess: Yup.boolean().required('Required'),
    listOwnContactAccess: Yup.boolean().required('Required'),
    exportContactAccess: Yup.boolean().required('Required'),
    addUserAccess: Yup.boolean().required('Required'),
    deleteUserAccess: Yup.boolean().required('Required'),
    editUserAccess: Yup.boolean().required('Required'),
    listUserAccess: Yup.boolean().required('Required'),
});
const initilaFormValues = {
    phoneNumber: "",
    name: "",
    addContactAccess: false,
    editContactAccess: false,
    deleteContactAccess: false,
    listAllContactAccess: false,
    listOwnContactAccess: false,
    exportContactAccess: false,
    addUserAccess: false,
    deleteUserAccess: false,
    editUserAccess: false,
    listUserAccess: false,
}

const MyForm = () => {
    const [mode, setMode] = useState(MODES.ADD)
    const [isLoading, setIsLoading] = useState(true)
    const [initialValues, setInitialValues] = useObjectDataHolder({...initilaFormValues})

    const myLocation = useLocation()
    const navigateTo = useNavigate()

    useEffect(() => {


        debugger
        const data = myLocation?.state?.data
        if (data) {
            setInitialValues(data);
            setMode(MODES.EDIT);
        }
        setTimeout(()=>{
            setIsLoading(false);
        },100)


    }, [myLocation?.state?.data]);

    const myPrivateAxios = useAxiosPrivate()
    const submitAddUser = async (values: {
        phoneNumber: string;
        name: string;
        addContactAccess: boolean;
        editContactAccess: boolean;
        deleteContactAccess: boolean;
        listAllContactAccess: boolean;
        listOwnContactAccess: boolean;
        exportContactAccess: boolean;
        addUserAccess: boolean;
        deleteUserAccess: boolean;
        editUserAccess: boolean;
        listUserAccess: boolean;
    }, resetForm: { (nextState?: Partial<FormikState<any>>): void; (): void; }) => {

        const url = mode === MODES.ADD ? '/users/add' : 'users/edit'

        try {

            const res = await myPrivateAxios.post(url, values)
            debugger
            if (res.data.message) {
                toast.success(res.data.message);
                if (mode === MODES.EDIT) {
                    navigateTo(-1)
                } else {
                        setInitialValues(initilaFormValues);
                        resetForm()
                }
            }

            // if (res.status === 201) {
            //     toast.success(res?.data?.message)
            //     setInitialValues(initilaFormValues);
            //     resetForm()
            //
            // }
        } catch (error) {
            toast(JSON.stringify(error))
        }
    }

    const title = mode === MODES.EDIT ? 'ویرایش کاربر' : 'افزودن کاربر';

    const resetFormToInitial = (resetForm) => {
        setMode(MODES.ADD);
        resetForm({ values: initilaFormValues });
    };

    return (<div>


            {
                isLoading ? <Loader/> :
                <div className={'select-none'}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, {setSubmitting, resetForm}) => {
                            console.log(values);
                            await submitAddUser(values, resetForm)
                        }}
                    >

                        {({errors, touched,resetForm}) => (
                            <Form>
                                <div className={'flex gap-3 my-5'}>

                                    <div className={'font-bold'}>{title}</div>

                                    {mode === MODES.EDIT && <button
                                      className={'rounded bg-blue-400 px-2'}
                                      onClick={() => {
                                          resetFormToInitial(resetForm)

                                      }}
                                    > افزودن </button>}
                                </div>

                                <div className="div__group__input_select">
                                    <label htmlFor="phoneNumber">شماره تماس کاربر (برای ورود به سامانه)</label>
                                    <Field name="phoneNumber" type="text" placeholder="Phone Number"/>
                                    {errors.phoneNumber && touched.phoneNumber && <div>{errors.phoneNumber}</div>}
                                </div>

                                <div className="div__group__input_select">
                                    <label htmlFor="name">نام و نام خانوادگی کاربر</label>
                                    <Field name="name" type="text" placeholder="Name"/>
                                    {errors.name && touched.name && <div>{errors.name}</div>}
                                </div>

                                {/* Render checkboxes for boolean fields */}
                                {Object.keys(initialValues).slice(2).map(key => {

                                        const labelValue = {
                                            addContactAccess: "دسترسی برای افزودن مخاطب جدید",
                                            editContactAccess: "دسترسی برای ویرایش مخاطب ها",
                                            deleteContactAccess: "دسترسی حذف مخاطب از لیست",
                                            listAllContactAccess: "مشاهده لیست تمامی مخاطبین",
                                            listOwnContactAccess: "مشاهده مخاطبینی که خودش ثبت کرده",
                                            exportContactAccess: 'خروجی گرفتن از مخاطبین***',
                                            addUserAccess: "دسترسی افزودن کاربر جدید",
                                            deleteUserAccess: "دسترسی حذف کاربر",
                                            editUserAccess: "دسترسی ویرایش اطلاعات و دسترسی های کاربر",
                                            listUserAccess: " مشاهده لیست کاربران ",
                                        }

                                        return <div className="div__group__input_select" key={key}>
                                            <label htmlFor={key}>{labelValue[key]}</label>
                                            <Field name={key} id={key} type="checkbox"/>
                                            {errors[key] && touched[key] && <div>{errors[key]}</div>}
                                        </div>
                                    }
                                )}

                                <div className="div__group__input_select">
                                    <button type="submit">Submit</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </div>
    );
};

export default MyForm;
