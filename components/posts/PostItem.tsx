import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirstWords } from '@/utils/textUtils';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { dispatchPostSelected } from '@/store/selectedPost';
import Badge from '../common/Badge';
import { PostProps } from '../../types/interfaces';
import { BLACK, SHADOW_DEFAULT, TEXT_COLOR, WHITE_DEFAULT } from '@/constants/colors';

interface Props {
  post: PostProps;
}

const CLOSED_POST_WORD_LIMIT = 15;

function PostItem({ post }: Props) {
  const { title, body, id } = post;

  const router = useRouter();
  const dispatch = useDispatch();

  function handlePostPress() {
    dispatchPostSelected(post)(dispatch);
    router.navigate(`/${post.id}`);
  }

  const renderText = getFirstWords(body, CLOSED_POST_WORD_LIMIT);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePostPress} activeOpacity={0.9}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{renderText}</Text>

      <Badge text={`Post number - ${id}`} />
    </TouchableOpacity>
  );
}

//todo: Chance style and do it responsive & constant
const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE_DEFAULT,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,

    ...SHADOW_DEFAULT,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BLACK,
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: TEXT_COLOR,
    lineHeight: 20,
    marginBottom: 16,
  },
});

export default PostItem;
