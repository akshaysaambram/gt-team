import { Tabs } from 'expo-router';
import { Icon, useTheme } from 'react-native-paper';
import { ms } from 'utils/metrics';

export default function MainLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'rgb(29, 27, 30)',
        tabBarStyle: { backgroundColor: theme.colors.primary },
        tabBarLabelPosition: 'beside-icon',
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => {
            return <Icon source="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => {
            return <Icon source="cog" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}

// const styles = StyleSheet.create({});
