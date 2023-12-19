import { Tabs } from 'expo-router';
import { Icon, useTheme } from 'react-native-paper';
import { ms } from 'utils/metrics';

export default function MainLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'rgb(29, 27, 30)',
        tabBarStyle: { backgroundColor: theme.colors.primary },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => {
            return <Icon source="home" size={ms(size)} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => {
            return <Icon source="cog" size={ms(size)} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}

// const styles = StyleSheet.create({});
