import { configureStore } from '@reduxjs/toolkit';
import posts from './posts';
import selectedPost from './selectedPost';

export const store = configureStore({
  reducer: {
    posts,
    selectedPost,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
