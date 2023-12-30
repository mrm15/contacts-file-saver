import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    requestToGetCategoryList: 0
}

const reducerList = {
    sendRequestToGetCategoryList: ((state: { requestToGetCategoryList: number; }) => {
        state.requestToGetCategoryList++;

    }),
}

export const requestToGetCategoryListReducer = createSlice({
    name: 'requestToGetCategoryListReducer',
    initialState,
    reducers: reducerList
});

export const requestToGetCategoryListActions = requestToGetCategoryListReducer.actions
