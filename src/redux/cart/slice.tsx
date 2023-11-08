import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { calcTotalPrice } from '../../utils/countTotalPrice';
import { getDataFromLS } from '../../utils/getDataFromLS';

const { items, totalPrice, totalCount } = getDataFromLS('cart');

const initialState: CartSliceState = {
  items: items,
  totalPrice: totalPrice,
  totalCount: totalCount,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<CartItem>) {
      const currentItem = state.items.find((item) => item.id === action.payload.id);

      if (currentItem) {
        currentItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeCartItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearCart(state) {
      state.items = [];

      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusCartItem(state, action: PayloadAction<string>) {
      const currentItem = state.items.find((item) => item.id === action.payload);

      if (currentItem) {
        currentItem.count--;

        state.totalCount = calcTotalCount(state.items);
        state.totalPrice = calcTotalPrice(state.items);
      }
    },
    setCount(state, action: PayloadAction<{ count: number; id: string }>) {
      const currentItem = state.items.find((item) => item.id === action.payload.id);

      if (currentItem) {
        currentItem.count = action.payload.count;

        state.totalCount = calcTotalCount(state.items);
        state.totalPrice = calcTotalPrice(state.items);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCartItem, removeCartItem, clearCart, minusCartItem, setCount } =
  cartSlice.actions;

export default cartSlice.reducer;
