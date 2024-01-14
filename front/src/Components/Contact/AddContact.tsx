import {Fragment, useEffect, useState} from 'react';
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import DynamicFormInputs from "../UI/FormInputType/DynamicFormInputs.tsx";
import "./style.scss"
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {MODES} from "../CONSTANTS/consts.tsx";

// Define the props interface
interface AddContactProps  {
        "firstName": string;
        "lastName": string;
        "phoneNumber": string;
        "email": string;
        "user": string;
        "province": string;
        "city": string;
        "address": string;
    } // '?' makes the property optional


const initialFormData:AddContactProps = {
    "firstName": "",
    "lastName": "",
    "phoneNumber": "",
    "email": "",
    "user": "",
    "province": "",
    "city": "",
    "address": "",
}



function AddContact() {


    const myLocation = useLocation()
    //const mode = contactData?.phoneNumber ? MODES.EDIT : MODES.ADD;
    const [mode, setMode] = useState(MODES.ADD)


    const title = mode === MODES.EDIT ? 'ویرایش مخاطب' : 'افزودن مخاطب';


    const [contactForm, setContactForm] = useObjectDataHolder({...initialFormData})

    const [addContactForm, setAddContactForm] = useState([
        {
            type: 'input',
            label: 'نام',
            name: 'firstName',
            placeholder: 'نام مخاطب',
            value: "",
            errorMessage: '',
            required: 'true'
        },
        {
            type: 'input',
            label: 'نام خانوادگی',
            name: 'lastName',
            placeholder: 'نام خانوادگی مخاطب',
            value: "",
            errorMessage: '',
            required: 'true'
        },

        {
            type: 'input',
            label: 'شماره تماس',
            name: 'phoneNumber',
            placeholder: 'شماره تماس',
            value: "",
            errorMessage: '',
            required: 'true'
        },
        {
            type: 'input',
            label: 'ایمیل',
            name: 'email',
            placeholder: 'شماره تماس',
            value: "",
            errorMessage: '',
            required: 'true'
        },
        {
            type: 'input',
            label: 'استان',
            name: 'province',
            placeholder: 'استان',
            value: "",
            errorMessage: '',
            required: 'true'
        },
        {type: 'input', label: 'شهر', name: 'city', placeholder: 'شهر', value: "", errorMessage: '', required: 'true'},
        {
            type: 'input',
            label: 'آدرس',
            name: 'address',
            placeholder: 'آدرس مخاطب',
            value: "",
            errorMessage: '',
            required: 'true'
        },
    ])

    useEffect(() => {


        if (myLocation?.state?.data) {
            setMode(MODES.EDIT)
            setContactForm(myLocation?.state?.data);

        }

    }, [myLocation?.state?.data]);

    useEffect(() => {
        const temp = addContactForm?.map(v => {
            const row = {...v}

            try {
                const rowName = v?.name
                row.value = contactForm[rowName]
                // if(contactData[rowName])
                return row
            } catch (error) {
                console.log(error)
                return row
            }

        })
        setAddContactForm(temp)
    }, [contactForm])


    const changeHandler = (value: any, objectKey: string) => {
        debugger
        setContactForm({[objectKey]: value})
    }


    const onBlur = (objectKey: string) => {
        // const value = e.target.value;
        //setContactForm({[objectKey]: 'value'})
        console.log(objectKey)
    }


    const navigateTo = useNavigate()
    const myAxiosPrivate = useAxiosPrivate()
    const submitHandler = async () => {
        const url = mode === MODES.ADD ? '/contact/add' : 'contact/edit'
        try {
            const res = await myAxiosPrivate.post(url, contactForm)
            debugger
            if (res.data.message) {
                toast.success(res.data.message);
                if (mode === MODES.EDIT) {
                    navigateTo(-1)
                } else {
                    setContactForm(initialFormData)
                }
            }
        } catch (error) {
            toast(JSON.stringify(error))
        }
    }

    const addContactHandleOnHeader = () => {
        setMode(MODES.ADD);
        setContactForm(initialFormData)

    }

    try {
        return (
            <div>
                <div>
                    <div className={'flex flex-wrap gap-2 cursor-pointer my-3.5'}>
                        <div className={'font-bold'}>{title}</div>
                        {mode === MODES.EDIT && <button
                          onClick={addContactHandleOnHeader}
                        > افزودن </button>}
                    </div>
                    <div className={'flex flex-wrap gap-1'}>
                        {addContactForm?.map((row, index) => {
                            const awesomeChangeHandler = (v) => {
                                debugger
                                changeHandler(v, row.name)

                            }

                            return <Fragment key={index}>
                                <DynamicFormInputs

                                    row={row}
                                    onChange={awesomeChangeHandler}
                                    onBlur={onBlur}

                                />
                            </Fragment>
                        })}
                    </div>
                    <>
                        <button
                            className={'mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'}
                            onClick={submitHandler}
                        >
                            {title}
                        </button>
                    </>
                </div>


            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default AddContact;
