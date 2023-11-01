import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: FavoritesSliceState = {
  items: [],
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
    },
    removeFavoritesItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFavorites(state) {
        state.items = [];
    }
  },
});

// Action creators are generated for each case reducer function
export const { addFavoritesItem, removeFavoritesItem, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
