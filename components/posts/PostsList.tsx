import { FlatList, View, StyleSheet } from 'react-native';
import usePostsLoader from '@/hooks/usePostsLoader';
import PostItem from './PostItem';
import Loading from '../common/Loading';
import NotAvailable from '../common/NotAvailable';
import { POSTS_LIMIT } from '@/constants/constants';

function PostsList() {
  const { posts, loading, loadMorePosts, refresh } = usePostsLoader();

  if (!posts.length && loading) {
    return <Loading text="Loading posts..." />;
  }

  if (!posts.length) {
    return <NotAvailable text={'No posts available'} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem post={item} />}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={refresh}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.7}
        ListFooterComponent={loading ? <Loading /> : null}
        maxToRenderPerBatch={POSTS_LIMIT / 2}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
  },
});

export default PostsList;
