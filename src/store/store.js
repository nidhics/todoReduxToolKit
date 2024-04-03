import { configureStore } from "@reduxjs/toolkit";
import toDoSlice from "../slices/toDoSlice";
import thunk from "redux-thunk";

export const store = configureStore({
    reducer: {
        task: toDoSlice
    },
    middleware: [thunk]
})