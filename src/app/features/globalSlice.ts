import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const initialState = {
    isOpenCartDrawer:false,
    onOpenCartDrawer:false,
    onCloseCartDrawer:false
}

const globalSlice = createSlice({
    initialState,
    name: "global",
    reducers: {

onOpenCartDrawer:(state)=>{state.onOpenCartDrawer= true
    state.isOpenCartDrawer= true
},
onCloseCartDrawer:(state)=>{state.onCloseCartDrawer= false
state.isOpenCartDrawer= false
},
    }})
    export const {onOpenCartDrawer,onCloseCartDrawer} = globalSlice.actions;
      export const selectglobal = (state: RootState) => state.global;
      export default globalSlice.reducer;