import { createSlice } from "@reduxjs/toolkit";

const cartSlice =createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuanitity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quanitity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
      } else {
          existingItem.quanitity++
          existingItem.totalPrice = existingItem.totalPrice + newItem.price
      }
    },
    removeItemsFromCart(state,action) {
        const id = action.payload
        const existingItem = state.items.find(item=> item.id ===id)
        if (existingItem.quanitity === 1) {
            state.items = state.items.filter(item => item.id !== id)
        }else {
            existingItem.quanitity--
            existingItem.totalPrice = existingItem.totalPrice -existingItem.price
        }
    },
  },
});
export const cartActions = cartSlice.actions
export default cartSlice