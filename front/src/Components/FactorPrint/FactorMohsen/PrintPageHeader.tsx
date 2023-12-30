import React from 'react';
import LogoImg from "../../../assets/images/LogoImg";

function PrintPageHeader({currentPage, totalPages, propsData}) {
    try {
        return (
            <div className={"fontSize14"}>
                <div  className={"fontSize10"}>صفحه {currentPage} از {totalPages}</div>
                <div className={"flex justify-between"}>
                    <div>
                        <div>شماره: {propsData.orderNumber}</div>
                        <div>تاریخ: {propsData?.date ?propsData?.date : "-" }</div>
                    </div>
                    <div>
                        <div>{propsData.title}</div>
                        <div className={"font-bold"}> از حروفسازی نمارنگ با مدیریت (جواد سرایی)</div>
                        <div>اولین تولیدی تخصصی انواع حروف برجسته در قالب سیستم همکاری در ایران</div>
                    </div>
                    <div><LogoImg/></div>
                </div>
            </div>

        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default PrintPageHeader;