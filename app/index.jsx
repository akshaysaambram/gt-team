import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useLayoutEffect } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { auth, db } from 'utils/firebase';

import useAppStore from './store/appStore';
import useUserStore from './store/userStore';
import { name as appName } from '../app.json';
import { ms } from '../utils/metrics';

export default function App() {
  const theme = useTheme();
  const router = useRouter();

  const isInitialLaunch = useAppStore((state) => state.isInitialLaunch);
  const setAuthUserDoc = useUserStore((state) => state.setAuthUserDoc);

  async function getUserDetails() {
    const user = auth.currentUser;

    onSnapshot(doc(db, 'users', user.uid), (userDoc) => {
      if (!userDoc.data()) {
        setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,

          XD: user.email.slice(0, 2),
          linkedIn: null,
          firstName: null,
          lastName: null,
          gender: null,
          role: null,
          bio: null,
          fullName: null,
          lastLogin: new Date().toISOString(),
          isAdmin: false,
        });

        return true;
      }

      setAuthUserDoc({ ...userDoc.data() });
      return false;
    });
  }

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const firstRoute = getUserDetails();

        if (firstRoute) {
          router.replace('/edit_profile', { firstLogin: true });
        } else {
          router.replace('/(main)/(home)/home');
        }
      } else {
        setAuthUserDoc({});
        return isInitialLaunch
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
