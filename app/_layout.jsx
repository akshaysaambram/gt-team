import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';

import useAppStore from './store/appStore';

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const colorScheme = useAppStore((state) => state.themeScheme);
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: 'Login',
            headerShown: false,
            // headerTitleStyle: { color: theme.colors.onPrimary },
            // headerStyle: { backgroundColor: theme.colors.primary },
          }}
        />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
