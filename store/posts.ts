import { RootState } from './store';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { PostProps } from '@/types/interfaces';

interface InitialStateProps {
  //posts: { [key: string]: PostProps }, todo: use object for performance
  list: PostProps[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialStateProps = {
  list: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsRequested: (posts) => {
      posts.loading = true;
      posts.error = null;
    },
    postsReceived: (posts, action: PayloadAction<{ posts: PostProps[] }>) => {
      posts.list = [...posts.list, ...action.payload.posts];
      posts.loading = false;
    },
    postsRefreshed: (posts, action: PayloadAction<{ posts: PostProps[] }>) => {
      posts.list = [...action.payload.posts];
      posts.loading = false;
    },
    postsRequestFailed: (posts, action: PayloadAction<{ error: string }>) => {
      posts.loading = false;
      posts.error = action.payload.error;
    },
  },
});

//Action creator
const { postsReceived, postsRequested, postsRefreshed, postsRequestFailed } = slice.actions;

export const dispatchPostsRequested = (dispatch: Dispatch) => {
  dispatch({ type: postsRequested.type });
};

export const dispatchPostsReceived = (posts: PostProps[]) => (dispatch: Dispatch) => {
  dispatch({ type: postsReceived.type, payload: { posts } });
};

export const dispatchPostsRefreshed = (posts: string) => (dispatch: Dispatch) => {
  dispatch({ type: postsRefreshed.type, payload: { posts } });
};

export const dispatchPostsRequestedFailed = (error: string) => (dispatch: Dispatch) => {
  dispatch({ type: postsRequestFailed.type, payload: { error } });
};

//Selector
export const getPosts = (state: RootState) => state.posts.list;

export const getPostsLoadingState = (state: RootState) => state.posts.loading;

export default slice.reducer;
