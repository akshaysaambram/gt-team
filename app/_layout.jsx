import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';

export default function Layout() {
  const colorScheme = useColorScheme() === 'dark';
  const theme = colorScheme ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Overview',
            headerTitleStyle: { color: theme.colors.onPrimary },
            headerStyle: { backgroundColor: theme.colors.primary },
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
