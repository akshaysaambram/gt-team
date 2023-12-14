import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function SettingsLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="settings"
        options={{ title: 'Settings', headerStyle: { backgroundColor: theme.colors.primary } }}
      />
      <Stack.Screen
        name="app_info"
        options={{ title: 'App Info', headerStyle: { backgroundColor: theme.colors.primary } }}
      />
    </Stack>
  );
}
