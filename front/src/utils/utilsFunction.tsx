
const stringToArray = (str: string): string[] => {
    return str.split("------");
};

const removeComma = (str: string | number): string => {
    if (!str) {
        return "";
    }

    if (typeof str === "string") {
        if (typeof str.replaceAll === "function") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
            return str.replaceAll(",", "");
        } else {
            return str.replace(/,/g, "");
        }
    } else {
        return str.toString().replace(/,/g, "");
    }

};

const randomNumberGenerator = (): number => Math.random() * 10000000000;

const utilsFunction = {

    stringToArray,
    removeComma,
    randomNumberGenerator,
};

export default utilsFunction;

export const addRowIdtoTable=(t)=>{

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const table = [...t]
    const newTable = table?.map((v,index)=>{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const row = {...v}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        row.RowId = index+1

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return row
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return newTable

}
