import { loadPostsHandler } from '@/bl/postsManager';
import { POSTS_LIMIT } from '@/constants/constants';
import { getPosts, getPostsLoadingState } from '@/store/posts';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const INIT_BATCH = 0;

const usePostsLoader = () => {
  const dispatch = useDispatch();

  const loading = useSelector(getPostsLoadingState);
  const posts = useSelector(getPosts);

  const [page, setPage] = useState(INIT_BATCH);

  useEffect(() => {
    loadMorePosts();
    console.log('Initial load posts.');
  }, []);

  async function loadMorePosts() {
    if (!loading) {
      await loadPostsHandler(dispatch, page, POSTS_LIMIT);
      setPage((prevPage) => prevPage + 1);
    }
  }

  async function refresh() {
    await loadPostsHandler(dispatch, page, POSTS_LIMIT, true);
    console.log('Refresh done.');

    setPage((prevPage) => prevPage + 1);
  }

  return { posts, loading, loadMorePosts, refresh };
};

export default usePostsLoader;
