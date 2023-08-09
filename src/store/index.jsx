import { configureStore } from "@reduxjs/toolkit";
import  todosReducer  from "./Slices/TodoSlice";


const store = configureStore({
    reducer : {
        todos : todosReducer
    },
})

export default store