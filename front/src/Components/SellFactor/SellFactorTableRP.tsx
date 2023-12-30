import './SellFactor.scss'
import utilsFunction from "../../utils/utilsFunction";
import commaSeparator from "../../utils/CommaSeparator";

const SellFactorTableRp = ({setComponentData, componentData, setMainTotalPrice}) => {

    const changeTe = (e, id) => {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const tempArray = [...componentData];
        for (let i = 0; i < tempArray.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (tempArray[i].id === id) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                tempArray[i].number = e.target.value
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                tempArray[i].totalPrice = (e.target.value * tempArray[i].price) - (tempArray[i].offer)
                break;
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setComponentData(tempArray)
    }

    const changePrice = (e, id) => {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const tempArray = [...componentData];
        for (let i = 0; i < tempArray.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (tempArray[i].id === id) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
                tempArray[i].price = utilsFunction.removeComma(e.target.value)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
                tempArray[i].totalPrice = (utilsFunction.removeComma(e.target.value) * tempArray[i].number) - (tempArray[i].offer)
                break;
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setComponentData(tempArray)
    }

    const changeOffer = (e, id) => {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const tempArray = [...componentData];
        for (let i = 0; i < tempArray.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (tempArray[i].id === id) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
                tempArray[i].offer = utilsFunction.removeComma(e.target.value)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
                tempArray[i].totalPrice = (tempArray[i].price * tempArray[i].number) - ((utilsFunction.removeComma(e.target.value)) * tempArray[i].number)
                break;
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setComponentData(tempArray)
    }

    function deleteRowHandler(id) {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let tempArray = componentData;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
        tempArray = tempArray.filter(v => v.id !== id)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setComponentData(tempArray)
    }

    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */}
            {componentData.map((v, index) =>
                <div className="main-sell-factor-RP">
                    <div className="inline-text">
                        <h5>نام کالا </h5>
                        <h5>:</h5>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        <p>{v?.name}</p>
                    </div>

                    <div className="inline-text">
                        <h5>شرح</h5>
                        <h5>:</h5>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        <p>{v?.description}</p>
                    </div>

                    <div className="inline-text">
                        <h5>واحد </h5>
                        <h5>:</h5>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        <p>{v?.unit}</p>
                    </div>

                    <div className="inline-text">
                        <h5>مقدار </h5>
                        <h5>:</h5>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */}
                        <input type="text" value={v?.number} onChange={e => changeTe(e, v.id)}/>
                    </div>

                    <div className="inline-text">
                        <h5>مبلغ واحد </h5>
                        <h5>:</h5>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */}
                        <input type="text" value={commaSeparator(v?.price)} onChange={e => changePrice(e, v.id)}/>
                    </div>

                    <div className="inline-text">
                        <h5>تخفیف </h5>
                        <h5>:</h5>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */}
                        <input type="text" value={commaSeparator(v?.offer)} onChange={e => changeOffer(e, v.id)}/>
                    </div>

                    <div className="inline-text">
                        <h5>مبلغ کل </h5>
                        <h5>:</h5>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */}
                        {commaSeparator(componentData[index]?.totalPrice)}
                    </div>

                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                    <div className={"delete-side"} onClick={() => deleteRowHandler(v.id)}>
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.99">
                                <path
                                    d="M20.6829 21.7435L12.1976 13.2582C11.9077 12.9683 11.9077 12.4875 12.1976 12.1976C12.4875 11.9077 12.9684 11.9077 13.2583 12.1976L21.7435 20.6829C22.0335 20.9728 22.0335 21.4536 21.7435 21.7435C21.4536 22.0334 20.9728 22.0334 20.6829 21.7435Z"
                                    fill="#F84459"/>
                                <path
                                    d="M12.1976 21.7435C11.9077 21.4536 11.9077 20.9728 12.1976 20.6829L20.6829 12.1976C20.9728 11.9077 21.4536 11.9077 21.7436 12.1976C22.0335 12.4875 22.0335 12.9683 21.7436 13.2582L13.2583 21.7435C12.9684 22.0334 12.4875 22.0334 12.1976 21.7435Z"
                                    fill="#F84459"/>
                            </g>
                        </svg>
                    </div>

                </div>
            )}

        </>


    );
};

export default SellFactorTableRp;