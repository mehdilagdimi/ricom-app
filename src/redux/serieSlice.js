import { createSlice } from "@reduxjs/toolkit";


export const serieSlice = createSlice({
    name : "serie",
    initialState : {
        study_id : null,
    },

    reducers : {
        updateStudyID : (state, action) => {
            state.study_id = action.payload
        },
    }
})

export const { updateStudyID } = serieSlice.actions;

export default serieSlice.reducer;