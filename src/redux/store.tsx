import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import smartphones from './smartphones/slice'

export const store = configureStore({
  reducer: {
    filter,
    smartphones,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;