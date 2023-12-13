import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function HomeLayout() {
  const theme = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{ headerTitle: 'Home', headerStyle: { backgroundColor: theme.colors.primary } }}
      />
      <Stack.Screen
        name="profile"
        options={{ headerTitle: 'Profile', headerStyle: { backgroundColor: theme.colors.primary } }}
      />
    </Stack>
  );
}

// const styles = StyleSheet.create({});