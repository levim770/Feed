import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommentProps } from '@/types/interfaces';
import { BLACK, TEXT_COLOR } from '@/constants/colors';

interface Props {
  comment: CommentProps;
}

const ICON_SIZE = 16;

function Comment({ comment }: Props) {
  const { body, likes, user } = comment;

  return (
    <View style={styles.container}>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.fullName}>{user.fullName}</Text>

      <View style={styles.meta}>
        <Ionicons name="thumbs-up-outline" size={ICON_SIZE} color={TEXT_COLOR} />
        <Text style={styles.likes}>{likes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    color: BLACK,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 12,
    color: BLACK,
    marginVertical: '2%',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  likes: {
    fontSize: 12,
    color: TEXT_COLOR,
    marginLeft: 5,
  },
});

export default Comment;
