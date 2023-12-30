import './AddProduct.scss';
import {FunctionComponent, useEffect, useState} from "react";
import {toast} from "react-toastify";
import AddGroupKala from "../AddGroupKala/AddGroupKala.tsx";
import Select from "react-select";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";


type Person = {
    name: string;
    category: string;
    description: string;
    unit: string;
    price: string;
    number: number;
}


type Data = {
    productGroup: {

        target: { e: Event;label: string; value: string; name: string; };
        label: string;
        value: string;
    }[],
}

// type Valid = {
//     name: boolean;
//     description: boolean;
//     unit: boolean;
//     price: boolean;
// }
//
// type Change = {
//     name: string;
//     value: string;
// }

const AddProduct: FunctionComponent = () => {


    const axiosPrivate = useAxiosPrivate();

    const [reload, setReload] = useState(0)


    const [data, setData] = useState<Data>({
        productGroup: [],
    })
    useEffect(() => {
        void axiosPrivate.get('/api/productGroup/').then(res => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (res.data.status) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
                setData(res.data.data)
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
                toast.error(res.data.message)
            }
        })
    }, [reload,axiosPrivate])

    const [values, setValues] = useState<Person>({
        name: "",
        category: "",
        description: "",
        unit: "",
        price: "",
        number: 1,
    });

    // const [formValid, setFormValid] = useState<Valid>({
    //     name: true,
    //     description: true,
    //     unit: true,
    //     price: true,
    // })
    const handleInputChange = (e: object) => {


        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {name, value} = e.target;
        setValues({
            ...values,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            [name]: value,
        });
    }

    const addProduct = () => {
        void axiosPrivate.post('/api/products', values).then(res => {
            //console.log(res)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (res.data.status) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
                toast.success(res.data.message)
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                toast.error(JSON.stringify(res.data.message))

            }
        })
    }

    return (

        <div className="main-form-add-product">


            <div className="grid-form">
                <div className="one-input">
                    <label htmlFor={"name"}>نام کالا</label>
                    <input
                        name={"name"}
                        type={"text"}
                        placeholder={"نام کالا را وارد کنید"}
                        value={values?.name}
                        onChange={handleInputChange}/>
                </div>
                <div className="one-input">
                    <label htmlFor={"productGroup"}>دسته بندی کالا</label>
                    <Select

                        options={data.productGroup}
                        // onChange={(e) => console.log(e)}
                        onChange={e => {
                            const customEvent = {
                                target: {
                                    name: 'category',
                                    value: e.value
                                }
                            };
                            handleInputChange(customEvent);
                        }}

                        name='category'
                        placeholder='انتخاب دسته بندی'
                        // defaultValue={2}
                        // disabled={true}
                        // required={false}
                        // className='reactSelectStyleInAddProduct'
                        // listStyle={{
                        //     backgroundColor: '#fafafa',
                        //     border: '1px solid #ccc',
                        // }}
                        // activeItemStyle={{ backgroundColor: '#e0e000' }}
                        // iconWidth='50'
                        // iconStyle={{
                        //   fontSize: '26px',
                        //   borderRadius: '0 5px 5px 0',
                        // }}
                        // purpose='search'
                        // onSearch={(e) => console.log(e)}
                        // onExactSearch={(e) => console.log(e)}
                    />
                    {/*<select*/}
                    {/*    name="category"*/}
                    {/*    id="productGroup"*/}
                    {/*    value={values.category}*/}
                    {/*    onChange={handleInputChange}*/}
                    {/*>*/}
                    {/*    <option value="">انتخاب کنید</option>*/}
                    {/*    {data.productGroup.map((pg, index) =>*/}
                    {/*        <option key={index} value={pg.value}>{pg.label}</option>)}*/}
                    {/*</select>*/}

                    <AddGroupKala
                        setReload={setReload}
                    />


                </div>

                <div className="one-input">
                    <label htmlFor={"description"}>شرح کالا</label>
                    <input
                        name={"description"}
                        type={"text"}
                        placeholder={"شرح کالا را وارد کنید"}
                        value={values?.description}
                        onChange={handleInputChange}/>
                </div>

                <div className="one-input">
                    <label htmlFor={"price"}>مبلغ واحد</label>
                    <input
                        name={"price"}
                        type={"text"}
                        placeholder={"مبلغ واحد را وارد کنید"}
                        value={values?.price}
                        onChange={handleInputChange}/>
                </div>

                <div className="one-input">
                    <label htmlFor={"unit"}>واحد</label>
                    <input
                        name={"unit"}
                        type={"text"}
                        placeholder={"واحد کالا را وارد کنید"}
                        value={values?.unit}
                        onChange={handleInputChange}/>
                </div>
            </div>

            <button onClick={addProduct} className="form-button">ثبت کالا</button>

        </div>
    );
};

export default AddProduct;