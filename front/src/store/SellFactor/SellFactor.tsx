import {fillInput} from "../functions";
import {createSlice} from "@reduxjs/toolkit";

const addRowIdToTableData = (table) => (table.map((row, index) => ({...row, rowId: index + 1})))
const calculateTotalPriceTableRow = (table) => {
    let newTable = [...table]

    let sum = newTable.reduce((accumulator, current) => {

        accumulator = +accumulator + +current.totalPrice
        return accumulator
    }, 0);
    return sum
}
const calculateSumTableRow = (table) => {
    let newTable = [...table]
    const temp = newTable.map((row) => {

        let totalPrice: number | string = +row.number * +row.price
        totalPrice = Math.ceil(totalPrice).toFixed(0)
        return {...row, totalPrice}

    })


    return temp
}

const initialState = {
    title: "",
    tableData: [],
    totalPrice: "",
    fileName: "",
    fileUrl: "",
    description: "",
}

const sellFactorReducers = {
    fillInput,
    removeItemFromTable: (state, action) => {

        let tableData = state.tableData.filter(row => row['_id'] !== action.payload.id)
        tableData = addRowIdToTableData(tableData);
        state.totalPrice = calculateTotalPriceTableRow(tableData);
        state.tableData = tableData
    },
    addItemToTable: (state, action) => {
        const newRow = action.payload.newRow
        let tableData = state.tableData;

        tableData.push(newRow)
        tableData = addRowIdToTableData(tableData);
        tableData = calculateSumTableRow(tableData)
        state.totalPrice = calculateTotalPriceTableRow(tableData);
        state.tableData = tableData
    },
    changeNumberHandler: (state, action) => {
        const {id, column, event} = action.payload
        //state.tableData = state.tableData
        const value = (event.target.value)
        let tableData = state.tableData.map(row => {
            if (id === row['_id'])
                row[column] = value;
            return {...row}
        })

        tableData = calculateSumTableRow(tableData)

        // tableData = addRowIdToTableData(tableData);
        state.totalPrice = calculateTotalPriceTableRow(tableData);
        state.tableData = tableData

    }

}

export const sellFactorSlice = createSlice({
    name: 'productList',
    initialState,
    reducers: sellFactorReducers
});

// export const getProductList = () => {
//
//     const requsetData = async (dispatch) => {
//         try {
//             const productListFormBack = await axiosPrivate.get('/api/products');
//
//             dispatch(productListActions.fillInput({productList: productListFormBack.data.data}))
//         } catch (err) {
//             console.log(err)
//         }
//     }
//     return requsetData
// }


export const sellFactorActions = sellFactorSlice.actions
