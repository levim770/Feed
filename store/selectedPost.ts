import { RootState } from './store';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { CommentProps, PostProps } from '@/types/interfaces';

interface InitialStateProps {
  selected: PostProps | undefined;
  comments: CommentProps[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialStateProps = {
  selected: undefined,
  comments: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    postSelected: (selectedPost, action: PayloadAction<{ post: PostProps }>) => {
      selectedPost.comments = []; //todo: Handle reset selected post better (solve the backHandler ios and routs issue) for now i use this workaround
      selectedPost.selected = action.payload.post;
    },
    selectedReset: (selectedPost) => {
      selectedPost.selected = undefined;
      selectedPost.comments = [];
      selectedPost.loading = false;
      selectedPost.error = null;
    },
    commentsRequested: (selectedPost) => {
      selectedPost.loading = true;
      selectedPost.error = null;
    },
    commentsReceived: (selectedPost, action: PayloadAction<{ comments: CommentProps[] }>) => {
      selectedPost.comments = action.payload.comments;
      selectedPost.loading = false;
    },
    commentsRequestFailed: (selectedPost, action: PayloadAction<{ error: string }>) => {
      selectedPost.loading = false;
      selectedPost.error = action.payload.error;
    },
    postLiked: (selectedPost) => {
      if (selectedPost.selected) {
        const prevLikes = selectedPost.selected.reactions.likes;
        selectedPost.selected.reactions.likes = prevLikes + 1;
      }
    },
  },
});

//Action creator
const { postSelected, selectedReset, commentsRequested, commentsReceived, commentsRequestFailed, postLiked } =
  slice.actions;

export const dispatchPostSelected = (post: PostProps) => (dispatch: Dispatch) => {
  dispatch({ type: postSelected.type, payload: { post } });
};

export const dispatchSelectedReset = (dispatch: Dispatch) => {
  dispatch({ type: selectedReset.type });
};

export const dispatchCommentsRequested = (dispatch: Dispatch) => {
  dispatch({ type: commentsRequested.type });
};

export const dispatchCommentsReceived = (comments: CommentProps[]) => (dispatch: Dispatch) => {
  dispatch({ type: commentsReceived.type, payload: { comments } });
};

export const dispatchCommentsRequestedFailed = (error: string) => (dispatch: Dispatch) => {
  dispatch({ type: commentsRequestFailed.type, payload: { error } });
};

export const dispatchPostLiked = (dispatch: Dispatch) => {
  dispatch({ type: postLiked.type });
};

//Selector
export const getSelectedPost = (state: RootState) => state.selectedPost.selected;

export const getCommentsOfSelectedPost = (state: RootState) => state.selectedPost.comments;

export const getCommentsLoadingState = (state: RootState) => state.selectedPost.loading;

export default slice.reducer;
