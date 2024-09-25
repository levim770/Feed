import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  text?: string;
}

function Loading({ text = 'Loading...' }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
      <Text style={styles.loading}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginTop: '1%',
  },
});

export default Loading;
