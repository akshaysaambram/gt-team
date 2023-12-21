import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useLayoutEffect } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { auth } from 'utils/firebase';

import useAppStore from './store/appStore';
import useUserStore from './store/userStore';
import { name as appName } from '../app.json';
import { ms } from '../utils/metrics';

export default function App() {
  const theme = useTheme();
  const router = useRouter();

  const isInitialLaunch = useAppStore((state) => state.isInitialLaunch);
  const setAuthUserDoc = useUserStore((state) => state.setAuthUserDoc);

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          router.replace('/(main)/(home)/edit_profile');
        } else {
          router.replace('/(main)/(home)/home');
        }
      } else {
        setAuthUserDoc({});
        return isInitialLaunch === true
          ? router.replace('/(onboardings)/screen1')
          : router.replace('/login');
      }
    });
  }, []);

  return (
    <View
      className="flex-1 items-center justify-center gap-y-2"
      style={{ backgroundColor: theme.colors.background }}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>uGc</Text>
      <Text style={styles.subtitle}>Unity Growth Co.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: ms(64),
  },
  subtitle: {
    fontSize: ms(20),
  },
});

AppRegistry.registerComponent(appName, () => App);
