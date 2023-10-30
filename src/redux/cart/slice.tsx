import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: CartSliceState = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItem(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCartItem } = cartSlice.actions

export default cartSlice.reducer