import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import smartphones from './smartphones/slice';
import cart from './cart/slice';
import favorites from './favorites/slice';

export const store = configureStore({
  reducer: {
    filter,
    smartphones,
    cart,
    favorites
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
