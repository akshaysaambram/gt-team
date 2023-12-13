import { Tabs } from 'expo-router';
import { Icon, useTheme } from 'react-native-paper';

export default function MainLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.primary },
        tabBarActiveTintColor: theme.colors.onPrimary,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => {
            return <Icon source="home" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => {
            return <Icon source="cog" size={size} color={color} />;
          },
          headerStyle: { backgroundColor: theme.colors.primary },
        }}
      />
    </Tabs>
  );
}

// const styles = StyleSheet.create({});
