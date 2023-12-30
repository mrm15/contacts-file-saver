import {createSlice} from "@reduxjs/toolkit";
import {fillInput} from "../functions";

const initialState = {
    productList: []
}

const reducerProductList = {
    fillInput,
}

export const productListReducer = createSlice({
    name: 'productList',
    initialState,
    reducers: reducerProductList
});

// export const getProductList = (axiosPrivate) => {
//
//
//     const requsetData = async (dispatch) => {
//         try {
//
//
//             const productListFormBack = await axiosPrivate.get('/api/products');
//
//             dispatch(productListActions.fillInput({productList: productListFormBack.data.data}))
//         } catch (err) {
//             console.log(err)
//         }
//     }
//     return requsetData
// }


export const productListActions = productListReducer.actions
