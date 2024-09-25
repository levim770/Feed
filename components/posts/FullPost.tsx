import { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchPostLiked, getCommentsOfSelectedPost, getSelectedPost } from '@/store/selectedPost';
import { loadCommentsByPostHandler } from '@/bl/postsManager';
import NotAvailable from '../common/NotAvailable';
import Badge from '../common/Badge';
import Comment from './Comment';
import { Ionicons } from '@expo/vector-icons';
import { CommentProps, PostProps } from '@/types/interfaces';
import { BLACK, SHADOW_DEFAULT, WHITE_DEFAULT } from '@/constants/colors';

const ICON_COLOR = '#666';
const ICON_SIZE = 24;

function FullPost() {
  const post: PostProps | undefined = useSelector(getSelectedPost);
  const comments: CommentProps[] = useSelector(getCommentsOfSelectedPost);
  const dispatch = useDispatch();

  useEffect(() => {
    loadCommentsByPostHandler(dispatch, id);
  }, []);

  if (!post) {
    return <NotAvailable text={'Post not available'} />;
  }

  const { title, body, views, tags, reactions, id } = post;

  function handleLikePress() {
    //Only UI simulation, The backend not support changes in data.
    dispatchPostLiked(dispatch);
  }

  //The backend not support changes in data.
  //todo: Handle dislike
  //todo: Add comment
  //todo: Add comment like

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.likesContainer}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={handleLikePress}>
              <Ionicons name="thumbs-up-outline" size={ICON_SIZE} color={ICON_COLOR} />
            </TouchableOpacity>
            <Text style={styles.reactions}>{reactions.likes}</Text>
          </View>

          <View style={styles.iconWrapper}>
            <Ionicons name="thumbs-down-outline" size={ICON_SIZE} color={ICON_COLOR} />
            <Text style={styles.reactions}>{reactions.dislikes}</Text>
          </View>
        </View>

        <View style={styles.iconWrapper}>
          <Ionicons name="eye-outline" size={ICON_SIZE} color={ICON_COLOR} />
          <Text style={styles.views}> {views}</Text>
        </View>
      </View>

      <View style={styles.tagsContainer}>
        <FlatList
          data={tags}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Badge text={item} />}
        />
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Comment comment={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE_DEFAULT,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    ...SHADOW_DEFAULT,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: BLACK,
    marginBottom: 20,
  },
  body: {
    fontSize: 18,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.45,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  views: {
    fontSize: 14,
    color: '#888',
  },
  reactions: {
    fontSize: 14,
    color: '#888',
    marginHorizontal: 3,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: '8%',
  },
});

export default FullPost;
