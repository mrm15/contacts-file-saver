import {useEffect, useState} from 'react';
import './SellFactor.scss';
import Select from "react-select";
import commaSeparator from "../../utils/CommaSeparator";
import MySellFactorTable from "./MySellFactorTable";
import {useDispatch, useSelector} from "react-redux";
import {getProductList, productListActions} from "../../store/ProductList/ProductList.tsx";
import {toast} from "react-toastify";
import Num2persian from 'num2persian';
import FactorMohsen from "../FactorPrint/FactorMohsen";
import {sellFactorActions} from "../../store/SellFactor/SellFactor.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import React from 'react';

const SellFactor = () => {

//     این اولش حتما باید فالز باشه
    const [showFactor, setShowFactor] = useState(false)
    const data = useSelector(s => s.sellFactorReducer)

    const dispatch = useDispatch()
    const newProductList = useSelector(s => s.productListReducer)
    const [selectOptionData, setSelectOptionData] = useState([])
    const [backData, setBackData] = useState({})
    const axiosPrivate = useAxiosPrivate();


    const handleSubmit = async () => {

        try {

            const sendData = {...data}
            delete sendData.productList;

            const res = await axiosPrivate.post("/api/orders/submit/new", sendData)


            if (res?.data?.status) {
                toast.success(res.data.message);

                setShowFactor(true);
                console.log(data)
                console.log(res.data.data)
                setTimeout(() => {
                    setBackData(res.data.data)

                }, 1000)

                setTimeout(() => {
                    // click On print
                    //document.getElementById("singlePrintInPage").click()
                }, 2000)
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const getData = async () => {
        const productListFormBack = await axiosPrivate.get('/api/products');
        if (productListFormBack.data.data) {
            dispatch(productListActions.fillInput({productList: productListFormBack.data.data}))


        }
    }

    useEffect(() => {
        void getData()
    }, []);
    useEffect(() => {

        const temp = []
        newProductList?.productList?.forEach((v) => {
            const label = v.name + " -- " + v.description
            temp.push({label, value: v['_id']})
        })
        setSelectOptionData(temp)


    }, [newProductList]);


    const changeHandler = (row) => {
        const value = row.value;
        // find  value  in productList
        const newRow = newProductList.productList.filter(singleRow => singleRow['_id'] === value)[0]
        const currentTable = [...data.tableData]
        // if there is same in table dont let add
        const isItThere = currentTable.find(p => p['_id'] === value)
        if (isItThere) {
            toast('کالا تکراری')
            return
        } else {


            dispatch(sellFactorActions.addItemToTable({newRow}))
        }


    }


    const customStyles = {

        control: (provided: Record<string, unknown>) => ({
            ...provided,
            height: 40,
            borderRadius: 10,
            '&:hover': {
                border: '1px solid #334667',
            },
            '&:focus': {
                border: '1px solid white',
            },
        }),

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        option: (base, state) => ({
            ...base,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            color: state.isSelected ? "white" : "#6D6D6D",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            backgroundColor: state.isSelected ? "#334667" : "white",
            padding: ".5rem 3rem .5rem .5rem",
            cursor: "pointer",
            fontSize: 14
        }),
    };
    return (

        <div className="main-sell-factor">

            <div className="w-full">
                <form className="w-full   rounded px-8 ">
                    <div className=" w-full mb-4 flex items-center justify-center">
                        <label
                            className="  block text-gray-700 text-sm font-bold mb-2 mx-2"
                            htmlFor="titleOfWorkIsHere"
                        >
                            عنوان
                        </label>
                        <input
                            className="w-full  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="titleOfWorkIsHere"
                            type="text"
                            placeholder="عنوان کار را وارد کنید"
                            value={data.title}
                            onChange={e => dispatch(sellFactorActions.fillInput({title: e.target.value}))}
                        />
                    </div>

                </form>

            </div>

            <div className="box-add-product">

                {/*<p>افزودن کالا : </p>*/}
                <Select
                    className="select-box-style"
                    defaultValue={{label: 'انتخاب کالا ...', value: "0"}}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={true}
                    styles={customStyles}
                    isSearchable={true}
                    name="color"
                    options={selectOptionData}

                    onChange={changeHandler}

                />
            </div>

            <div className="">
                {/*<SellFactorTable tableData={tableData} componentData={componentData} setComponentData={setComponentData}*/}
                {/*                 setMainTotalPrice={setMainTotalPrice}/>*/}
                <MySellFactorTable/>

            </div>


            <div className="box-file-sum">

                {/*<button className="factor-but" onClick={() => console.log(mainTotalPrice)}>چاپ فاکتور</button>*/}

                <div className="sum-side">
                    <p>جمع مبلغ فاکتور</p>
                    <h5>{commaSeparator(data.totalPrice)} تومان</h5>

                </div>
                {data.totalPrice ?
                    <div className="sum-side mx-1">
                        <p>جمع مبلغ به حروف:</p>
                        <h5>{Num2persian(data.totalPrice)} تومان</h5>

                    </div> : null}

            </div>
            <div>

                <div>
                    <input
                        className="w-full  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description111"
                        type="text"
                        placeholder="توضیحات کاربر"
                        value={data.description}
                        onChange={e => dispatch(sellFactorActions.fillInput({description: e.target.value}))}
                    />
                </div>
                <div className={'flex'}>

                    <button
                        onClick={() => handleSubmit(0)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        ثبت
                    </button>
                    <button
                        onClick={() => handleSubmit(1)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4">
                        ثبت و پرینت فاکتور
                    </button>

                </div>

                {Object.keys(backData).length > 0 &&
                  <FactorMohsen data={backData}/>
                }
            </div>


        </div>
    );
};

export default SellFactor;