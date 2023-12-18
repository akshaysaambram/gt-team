import { Stack } from 'expo-router';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';

import useAppStore from './store/appStore';
import { useColorScheme } from 'react-native';

const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    tabBarActiveHintColor: MD3DarkTheme.colors.background,
  },
};

const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: MD3LightTheme.colors.primary,
    onPrimary: MD3LightTheme.colors.onPrimary,
  },
};

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const appThemeScheme = useAppStore((state) => state.themeScheme);
  const appColorScheme = appThemeScheme === 'system' ? systemColorScheme : appThemeScheme;
  const theme = appColorScheme === 'dark' ? DarkTheme : LightTheme;

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
