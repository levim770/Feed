import { Text, View, StyleSheet } from 'react-native';
import { BLACK } from '@/constants/colors';

interface Props {
  text: string;
}

//todo: Dynamic style
export function Badge({ text }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    paddingVertical: 4,
    borderRadius: 20,
    color: '#555',
    fontSize: 12,
    paddingHorizontal: 12,
    marginHorizontal: '2%',
  },
  text: {
    fontSize: 12,
    color: BLACK,
  },
});

export default Badge;
