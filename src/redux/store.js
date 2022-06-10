import { configureStore } from "@reduxjs/toolkit";
import recordReducer from './recordSlice'

export default configureStore ({
    reducer : {
        record: recordReducer,
    }
})