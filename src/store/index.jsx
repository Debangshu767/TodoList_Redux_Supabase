import { configureStore } from "@reduxjs/toolkit";
import  todosReducer  from "./Slices/TodoSlice";
import tokenReducer from './Slices/TokenSlice'

const store = configureStore({
    reducer : {
        todos : todosReducer,
        token: tokenReducer,
    },
})

export default store