import {configureStore} from "@reduxjs/toolkit";
import {requestToGetCategoryListReducer} from "./requestTogetCategoryList.tsx";
import {productListReducer} from "./ProductList/ProductList.tsx";
import {sellFactorSlice} from "./SellFactor/SellFactor.tsx";
import {sidebarReducer} from "./sidebarReducer/sidebarReducer.tsx";

const store = configureStore({
    reducer: {
        requestToGetCategoryListReducer: requestToGetCategoryListReducer.reducer,
        productListReducer: productListReducer.reducer,
        sellFactorReducer:sellFactorSlice.reducer,
        sidebarReducer : sidebarReducer.reducer,


    }
});

export default store;