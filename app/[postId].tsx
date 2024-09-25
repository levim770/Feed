import { View, StyleSheet } from 'react-native';
import FullPost from '@/components/posts/FullPost';

function postId() {
  return (
    <View style={styles.container}>
      <FullPost />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    padding: '5%',
  },
});

export default postId;
