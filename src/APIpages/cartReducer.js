import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartPage",
  initialState: { cart: {} },
  reducers: {
    cartAdd(state, { payload: good }) {
      if (state.cart[good._id]) {
        state.cart[good._id].count++;
      } else {
        state.cart[good._id] = { good, count: 1 };
      }
    },
    cartSub(state, { payload: good }) {
      state.cart[good._id].count--;
    },
    cartDelete(state, { payload: good }) {
      delete state.cart[good._id];
    },
    cartClear(state) {
      state.cart = {};
    },
  },
});
export const { cartAdd, cartSub, cartDelete, cartClear } = cartSlice.actions;
