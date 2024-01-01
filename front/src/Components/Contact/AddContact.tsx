import {useEffect, useState} from 'react';
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import DynamicFormInputs from "../UI/FormInputType/DynamicFormInputs.tsx";
import "./style.scss"
import {axiosPrivate} from "../../api/axios.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";

// Define the props interface
interface AddContactProps {
    contactData?: {
        "firstName": string;
        "lastName": string;
        "phoneNumber": string;
        "email": string;
        "user": string;
        "province": string;
        "city": string;
        "address": string;
    }; // '?' makes the property optional
}

const MODES = {
    ADD: "add",
    EDIT: "edit"
}

function AddContact(props: AddContactProps) {


    const contactData = props.contactData;
    const mode = contactData.phoneNumber ? MODES.EDIT : MODES.ADD;

    const title = mode === MODES.EDIT ? 'ویرایش مخاطب' : 'افزودن مخاطب';


    const [contactForm, setContactForm] = useObjectDataHolder({
        "firstName": "",
        "lastName": "",
        "phoneNumber": "",
        "email": "",
        "user": "",
        "province": "",
        "city": "",
        "address": "",
    })

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

        if (!contactData.phoneNumber) {
            return;
        }

        setContactForm(contactData);
    }, [props.contactData]);

    useEffect(() => {
        const temp = addContactForm.map(v => {
            const row = {...v}
            const rowName = v.name
            row.value = contactData[rowName]
            // if(contactData[rowName])
            return row
        })

        setAddContactForm(temp)
    }, [JSON.stringify(contactForm)]);


    console.log(contactForm)
    const changeHandler = (value: any ,objectKey: string) => {
        setContactForm({[objectKey]: value})
    }


    const onBlur = (objectKey: string) => {
        // const value = e.target.value;
        //setContactForm({[objectKey]: 'value'})
        console.log(objectKey)
    }


    const myAxiosPrivate = useAxiosPrivate()
    const submitHandler = () => {
        const url = mode === MODES.ADD ? '/contact/add' : 'contacts/edit'
        const res = myAxiosPrivate.post(url, contactForm)
if(res.data)
        
        console.log(res)

    }


    try {
        return (
            <div>
                <div>
                    <div>{title}</div>
                    <div className={'flex flex-wrap gap-1'}>
                        {addContactForm?.map((row, index) => {
                            const awesomeChangeHandler = (v) => {
                                changeHandler(v, row.name)

                            }

                            return <div className={''}>
                                <DynamicFormInputs
                                    key={index}
                                    row={row}
                                    onChange={awesomeChangeHandler}
                                    onBlur={onBlur}

                                />
                            </div>
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
