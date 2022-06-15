import { createSlice } from "@reduxjs/toolkit";


export const recordSlice = createSlice({
    name : "record",
    initialState : {
        record_id : null,
        patient_id : null,
        physician_lname : null,
        physician_order : null,
        addedat : null,
        status : null,
        radiologist_id : null,
        refresh : false,
        selected : false,
    },
    reducers : {
        updateRadID : (state, action) => {
            state.radiologist_id = action.payload.radiologist_id
        },
        updateRecordID : (state, action) => {
            state.order_id = action.payload.order_id
        },
        updatePhysicianName : (state, action) => {
            state.physician_lname = action.payload.physician_lname
        },
        triggerRefresh : (state) => {
            state.refresh = !state.refresh
        },
        selectRecord : (state) => {
            state.selected = true;
        }

    }
})

export const { updateRadID, updateRecordID, updatePhysicianName, triggerRefresh, selectRecord } = recordSlice.actions;

export default recordSlice.reducer;