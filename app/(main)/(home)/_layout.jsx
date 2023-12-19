import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function HomeLayout() {
  const theme = useTheme();

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: theme.colors.primary } }}>
      <Stack.Screen name="home" options={{ headerTitle: 'Home' }} />
      <Stack.Screen name="team" options={{ headerTitle: 'Team' }} />
      <Stack.Screen name="profile" options={{ headerTitle: 'Profile' }} />
      <Stack.Screen
        name="edit_profile"
        options={{
          headerTitle: 'Update Profile',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Team Profile',
        }}
      />
    </Stack>
  );
}
