import React from 'react';
import {formatToPersianAddComma} from "../../../utils/CommaSeparator.tsx";
import "./PrintPageBody.scss"

function PrintPageBody({data,propsData}) {

    const sum = {totalSum: 0}
    console.log(data)
    return (
        <div className={"PrintPageBody"}>
            <div className={"table__container"}>
                <table>
                    <thead>
                    <tr className={"first__Row"}>
                        <th>ردیف</th>
                        <th>شرح</th>
                        <th>تعداد</th>
                        <th>مبلغ واحد</th>
                        <th>قیمت کل</th>
                        <th>ملاحظات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map((product, index) => {
                        sum.totalSum += +product?.totalPrice
                        return <tr>
                            <td>{index + 1}</td>
                            <td>{product?.name}</td>
                            <td>{product?.number}</td>
                            <td>{formatToPersianAddComma(product?.price)}</td>
                            {/*<td>{product.description}</td>*/}
                            {/*<td>{product.category}</td>*/}
                            {/*<td>{product.rowId} -111-</td>*/}
                            <td>{formatToPersianAddComma(product?.totalPrice)}</td>
                            <td></td>
                        </tr>
                    })}
                    </tbody>
                    <tfoot>
                    <tr className={"font-bold"}>
                        <td></td>
                        <td>
                            <span>جمع مبلغ صفحه  </span>
                            <span>{formatToPersianAddComma(sum.totalSum)}</span>

                        </td>
                        <td></td>
                        <td>جمع کل</td>
                        <td>{formatToPersianAddComma(propsData.totalPrice)}</td>
                        <td></td>
                    </tr>
                    </tfoot>
                </table>

            </div>
        </div>
    );
}

export default PrintPageBody;