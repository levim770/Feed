import { BLACK } from '@/constants/colors';
import { dispatchSelectedReset } from '@/store/selectedPost';
import { store } from '@/store/store';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';

//todo: extract screenOptions
function RootLayout() {
  const router = useRouter();
  // const dispatch = useDispatch();

  function handleGoBack() {
    // dispatchSelectedReset(dispatch);
    router.back();
  }
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            color: BLACK,
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}>
        <Stack.Screen
          name="index"
          options={{
            title: 'Feed App',
            headerLeft: undefined,
          }}
        />
        <Stack.Screen
          name="[postId]"
          options={{
            title: 'Full Post',
          }}
        />
      </Stack>
    </Provider>
  );
}

export default RootLayout;
