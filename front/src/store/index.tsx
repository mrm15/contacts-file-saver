import {configureStore} from "@reduxjs/toolkit";
import {requestToGetCategoryListReducer} from "./requestTogetCategoryList.tsx";
import {productListReducer} from "./ProductList/ProductList.tsx";
import {sellFactorSlice} from "./SellFactor/SellFactor.tsx";

const store = configureStore({
    reducer: {
        requestToGetCategoryListReducer: requestToGetCategoryListReducer.reducer,
        productListReducer: productListReducer.reducer,
        sellFactorReducer:sellFactorSlice.reducer


    }
});

export default store;