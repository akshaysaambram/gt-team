import { useRouter } from 'expo-router';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { name as appName } from '../app.json';
import { hs, ms } from '../utils/metrics';

export default function App() {
  const theme = useTheme();
  const router = useRouter();

  setTimeout(() => router.replace('/login'), 3000);

  return (
    <View
      className="flex-1"
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View className="flex-1 items-center justify-center gap-2" style={styles.main}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>uGc</Text>
        <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>
          Unity Growth Co.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: ms(24),
  },
  main: {
    maxWidth: hs(960),
  },
  title: {
    fontSize: ms(64),
  },
  subtitle: {
    fontSize: ms(20),
  },
});

AppRegistry.registerComponent(appName, () => App);
