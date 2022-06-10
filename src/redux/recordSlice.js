import { createSlice } from "@reduxjs/toolkit";


export const recordSlice = createSlice({
    name : "record",
    initialState : {
        order_id : null,
        patient_id : null,
        physician_lname : null,
        physician_order : null,
        addedat : null,
        status : null,
        radiologist_id : null
    },
    reducers : {
        updateRadID : (state, action) => {
            state.radiologist_id = action.payload.radiologist_id
        },
        updateOrdID : (state, action) => {
            state.order_id = action.payload.order_id
        },
        updatePhysicianName : (state, action) => {
            state.physician_lname = action.payload.physician_lname
        }
    }
})

export const { updateRadID, updateOrdID, updatePhysicianName } = recordSlice.actions;

export default recordSlice.reducer;