import { Dispatch } from '@reduxjs/toolkit';
import {
  dispatchPostsReceived,
  dispatchPostsRefreshed,
  dispatchPostsRequested,
  dispatchPostsRequestedFailed,
} from './../store/posts';
import {
  dispatchCommentsReceived,
  dispatchCommentsRequested,
  dispatchCommentsRequestedFailed,
} from './../store/selectedPost';
import { COMMENTS_BY_POST_URL, POSTS_LIMIT, POSTS_URL } from '@/constants/constants';

export async function loadPostsHandler(dispatch: Dispatch, page = 0, limit = POSTS_LIMIT, refresh = false) {
  try {
    dispatchPostsRequested(dispatch);

    const skip = page * POSTS_LIMIT;
    console.log('Page:', page, '.  skip:', skip);

    const response = await fetch(`${POSTS_URL}?limit=${limit}&skip=${skip}`);
    const data = await response.json();

    console.log('Fetched post data =>', data);

    if (refresh) {
      dispatchPostsRefreshed(data.posts)(dispatch);
      return;
    }

    dispatchPostsReceived(data.posts)(dispatch);
  } catch (error) {
    const message = (error as Error).message || 'Failed to fetch posts.';
    dispatchPostsRequestedFailed(message)(dispatch);
  }
}

export async function loadCommentsByPostHandler(dispatch: Dispatch, postId: number) {
  try {
    dispatchCommentsRequested(dispatch);

    const response = await fetch(`${COMMENTS_BY_POST_URL}${postId}`);
    const data = await response.json();

    console.log('Fetched comments data =>', data);

    dispatchCommentsReceived(data.comments)(dispatch);
  } catch (error) {
    const message = (error as Error).message || 'Failed to fetch comments.';
    dispatchCommentsRequestedFailed(message)(dispatch);
  }
}
