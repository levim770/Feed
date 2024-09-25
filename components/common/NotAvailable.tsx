import { View, Text, StyleSheet } from 'react-native';

interface Props {
  text?: string;
}

const DEFAULT_TEXT = 'Item not available';

function NotAvailable({ text = DEFAULT_TEXT }: Props) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotAvailable;
