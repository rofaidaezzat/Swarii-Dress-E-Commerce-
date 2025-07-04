import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AddShippingToCart, CartItemType } from "../../utils";

interface CartState {
    CartProduct: CartItemType[];
}
const initialState: CartState = {
    CartProduct: []
}
const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        addtocart:(state,action)=>{
            state.CartProduct=AddShippingToCart(action.payload,state.CartProduct)
        },
        removefromcart:(state,action)=>{
            state.CartProduct=state.CartProduct.filter(item=>item.id!==action.payload)
        },
        clearcart:(state)=>{
            state.CartProduct=[]
           
        }
    },
  });
  export const {addtocart,removefromcart,clearcart} = cartSlice.actions;
  export const selectcart = (state: RootState) => state.cart;
  export default cartSlice.reducer;