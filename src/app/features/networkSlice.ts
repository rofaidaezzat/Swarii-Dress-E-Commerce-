import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOnline: true
}
const networkSlice = createSlice({
    initialState,
    name: "network",
    reducers: {
        networkmode: (state,action) => { state.isOnline = action.payload },
    }})
    export const {networkmode} = networkSlice.actions;
   
          export default networkSlice.reducer;