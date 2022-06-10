import { createSlice } from "@reduxjs/toolkit";


export const recordSlice = createSlice({
    name : "record",
    initialState : {
        patient_id : null,
        physician_order : null,
        addedat : null,
        status : null,
        radiologist_id : null
    },
    reducers : {
        updateRadID : (state, action) => {
            state.radiologist_id = action.payload.radiologist_id;
        }
    }
})

export const { updateRadID } = recordSlice.actions;

export default recordSlice.reducer;