import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import smartphones from './smartphones/slice';
import cart from './cart/slice';
import favorites from './favorites/slice';
import pagination from './pagination/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    smartphones,
    cart,
    favorites,
    pagination
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
