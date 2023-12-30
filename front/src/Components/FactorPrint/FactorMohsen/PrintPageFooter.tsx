import React from 'react';
import Num2persian from 'num2persian';

function PrintPageFooter({propsData}) {
    try {
        return (
            <div>
                <div>مبلغ قابل پرداخت {Num2persian(propsData.totalPrice)} تومان</div>
                <div className={"flex justify-between"}>
                    <div>تلفن:</div>
                    <div>کد پستی</div>
                    <div>شماره حساب: 6037991855664877</div>
                </div>
                <div className={"flex justify-between mt-8"}>
                    <div></div>
                    <div>امضا خریدار:</div>
                    <div>امضا فروشنده</div>
                    <div></div>
                </div>

            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default PrintPageFooter;