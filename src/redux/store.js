import { configureStore } from "@reduxjs/toolkit";
import recordReducer from './recordSlice'
import serieReducer from './serieSlice'

export default configureStore ({
    reducer : {
        record: recordReducer,
        serie: serieReducer,
    }
})