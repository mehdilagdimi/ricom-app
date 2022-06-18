import { createSlice } from "@reduxjs/toolkit";


export const serieSlice = createSlice({
    name : "serie",
    initialState : {
        study_id : null,
        sliceSelected : false,
    },

    reducers : {
        updateStudyID : (state, action) => {
            state.study_id = action.payload
        },
        updateSelectedSlice : (state, action) => {
            state.sliceSelected = action.payload
        },
    }
})

export const { updateStudyID, updateSelectedSlice } = serieSlice.actions;

export default serieSlice.reducer;