import { createSlice } from "@reduxjs/toolkit";
import Item from "antd/es/list/Item";


const cardSlice = createSlice({
    name: 'Cart',
    initialState: {
        cartItems:localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")).cartItems
        : [],
        total:localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")).total
        : 0,
         
        tax: 8
    },
    reducers: {
      addProduct: (state,action) => {
        const findCartItem = state.cartItems.find((item) => item._id === action.payload._id )

        if(findCartItem) {
            findCartItem.quantity = findCartItem.quantity +1
        }else {
            state.cartItems.push(action.payload)
        }
        state.total += action.payload.price
       
      },
      deleteCartItem: (state,action) => {
        const findCartItem = state.cartItems.find((item) => item._id === action.payload._id )
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        )
        state.total -= action.payload.price* action.payload.quantity
      },
      increase: (state,action) => {
        const cartItem = state.cartItems.find((item) => item._id === action.payload._id )
        cartItem.quantity += 1
        state.total += cartItem.price
      },
      decrease: (state,action) => {
        const cartItem = state.cartItems.find((item) => item._id === action.payload._id )
        cartItem.quantity -= 1
        if (cartItem.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload._id
          )
        }
        state.total -= cartItem.price
      },
      reset: (state) => {
        state.cartItems = []
        state.total = 0
      }

      

      
    },
})

export const {addProduct,deleteCartItem,increase,decrease,reset} = cardSlice.actions
export default cardSlice.reducer