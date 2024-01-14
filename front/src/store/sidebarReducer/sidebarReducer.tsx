import {createSlice} from "@reduxjs/toolkit";
import {fillInput} from "../functions";

const initialState = {
    isOpen: true,
    isMobile: window.innerWidth <= 768
}

const reducerSideBar = {
    fillInput,
}

export const sidebarReducer = createSlice({
    name: 'sidebar',
    initialState,
    reducers: reducerSideBar
});


export const sidebarActions = sidebarReducer.actions
