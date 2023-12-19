import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function SettingsLayout() {
  const theme = useTheme();

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: theme.colors.primary } }}>
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="app_info" options={{ title: 'App Info' }} />
    </Stack>
  );
}
