import './SellFactorTable.scss';
import DataSellTable from "./DataSellTable/DataSellTable";



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const SellFactorTable = ({tableData , componentData , setComponentData , setMainTotalPrice}) => {


    return (

        <div className="main-table">

            <ul className="header-side">
                <li style={{width: "25%"}}>نام کالا</li>
                <li style={{width: "35%"}}>شرح</li>
                <li style={{width: "10%"}}>واحد</li>
                <li style={{width: "5%"}}>تعداد</li>
                <li style={{width: "5%"}}>مبلغ واحد</li>
                <li style={{width: "5%"}}>تخفیف</li>
                <li style={{width: "10%"}}>مبلغ کل</li>
                <li style={{width: "5%"}}>عملیات</li>
            </ul>

            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
            {tableData.length > 0 &&
                <DataSellTable
                      componentData={componentData} setComponentData={setComponentData} setMainTotalPrice={setMainTotalPrice}
                />
            }

        </div>
    );
};

export default SellFactorTable;