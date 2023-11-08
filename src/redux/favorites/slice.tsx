import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { FavoritesSliceState } from './types';
import { getDataFromLS } from '../../utils/getDataFromLS';

const { items, totalCount } = getDataFromLS('favorites');

const initialState: FavoritesSliceState = {
  items: items,
  totalCount: totalCount,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoritesItem(state, action: PayloadAction<CartItem>) {
      const currentItem = state.items.find((item) => item.id === action.payload.id);

      if (!currentItem) {
        state.items.push(action.payload);
      }

      state.totalCount = calcTotalCount(state.items);
    },
    removeFavoritesItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.totalCount = calcTotalCount(state.items);
    },
    clearFavorites(state) {
      state.items = [];

      state.totalCount = calcTotalCount(state.items);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFavoritesItem, removeFavoritesItem, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
