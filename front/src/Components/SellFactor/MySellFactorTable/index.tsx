import "./mySellFactorTable.scss"
 import {formatToPersianAddComma, parseToEnRemoveComma} from "../../../utils/CommaSeparator.tsx";
import {useDispatch, useSelector} from "react-redux";
import {sellFactorActions, sellFactorSlice} from "../../../store/SellFactor/SellFactor.tsx";


function Index(props) {

    const dispatch = useDispatch()
    const data = useSelector(s => s.sellFactorReducer)
    const tableData = data.tableData;


    const changeTableHandler = (id, column, event) => {
        dispatch(sellFactorActions.changeNumberHandler({id, column, event}))
    }
    const deleteRowHandler = (id) => {
        dispatch(sellFactorActions.removeItemFromTable({id}))
    }


    return (
        <div className={'box-table'}>
            <div
                className={'mySellFactorTable'}

            >
                <div className={'myTable'}>
                    <ul>
                        <li>ردیف</li>
                        <li>نام کالا</li>
                        <li>شرح</li>
                        <li>واحد</li>
                        <li>مقدار</li>
                        <li>مبلغ واحد</li>
                        <li>تخفیف</li>
                        <li>مبلغ کل</li>
                        <li>عملیات</li>

                    </ul>
                    {tableData.map((product, i) => {
                        const id = product['_id']

                        return <ul key={i + ""}>
                            <li>{product.rowId}</li>
                            <li>{product.name}</li>
                            <li>{product.description}</li>
                            <li>{product.unit}</li>
                            <li>
                                <input
                                    type="text"
                                    value={(product.number)}
                                    onFocus={e => e.target.select()}
                                    onChange={(e) => changeTableHandler(id, "number", e)}
                                />
                            </li>
                            <li>{product.price}</li>
                            <li>{0}</li>
                            <li>{formatToPersianAddComma(product.totalPrice)}</li>
                            <li style={{color: 'red'}}>
                                <div
                                    className={'cursor-pointer'}
                                    onClick={() => deleteRowHandler(id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                    </svg>
                                </div>
                            </li>

                        </ul>

                    })}
                </div>

            </div>
        </div>

    );
}

export default Index;