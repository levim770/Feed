import { StyleSheet, View } from 'react-native';

import PostsList from '@/components/posts/PostsList';

function Index() {
  return (
    <View style={styles.container}>
      <PostsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Index;
