import { firebase } from 'firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import useAppStore from './store/appStore';
import useUserStore from './store/userStore';
import { auth, db } from '../utils/firebase';
import { hs, vs, ms } from '../utils/metrics';

export default function Login() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const animationLoop = useAppStore((state) => state.animationLoop) === 'loop';
  const setAuthUserDoc = useUserStore((state) => state.setAuthUserDoc);

  const [error, setError] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);

  async function getUserDetails() {
    const user = auth.currentUser;

    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (userDoc) => {
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
          firstLogin: firebase.firestore.FieldValue.serverTimestamp(),
          lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
          isAdmin: false,
          isFilled: false,
        });
      }
      // else {
      //   updateDoc(doc(db, 'users', user.uid), {
      //     ...userDoc.data(),
      //     lastLogin: new Date().toISOString(),
      //   });
      // }

      setAuthUserDoc({ ...userDoc.data() });
    });

    return unsubscribe;
  }

  async function handleLogin() {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        getUserDetails();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(`Error Code : ${errorCode}\nError Message: ${errorMessage}`);
        setVisibleDialog(true);
      });
    setLoading(false);
  }

  async function handleForgetPassword() {
    setLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setError(`Password reset mail sent to ${email}`);
        setVisibleDialog(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(`Error Code : ${errorCode}\nError Message: ${errorMessage}`);
        setVisibleDialog(true);
      });
    setLoading(false);
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        gap: vs(24),
      }}>
      <View className="items-center gap-y-1">
        <Text
          variant="displayMedium"
          style={[styles.textDisplayMedium, { color: theme.colors.primary }]}>
          uGc
        </Text>
        <Text variant="bodyMedium" style={[styles.textBodyMedium]}>
          Unity Growth Co.
        </Text>
      </View>
      <LottieView
        autoPlay
        loop={animationLoop}
        style={{
          width: hs(100),
          height: vs(100),
        }}
        source={require('../assets/lottie-files/login.json')}
      />
      <View className="gap-y-4">
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
          onChangeText={(txt) => setEmail(txt)}
          style={[styles.textInput, { fontSize: ms(14) }]}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Password"
          textContentType="password"
          secureTextEntry={secureText}
          value={password}
          onChangeText={(txt) => setPassword(txt)}
          style={[styles.textInput, { fontSize: ms(14) }]}
          right={
            secureText ? (
              <TextInput.Icon
                icon="eye-off"
                style={{ marginTop: vs(16) }}
                onPress={() => setSecureText(false)}
              />
            ) : (
              <TextInput.Icon
                icon="eye"
                style={{ marginTop: vs(16) }}
                onPress={() => setSecureText(true)}
              />
            )
          }
        />
      </View>
      {loading ? (
        <View style={{ padding: vs(36) }}>
          <ActivityIndicator size={ms(36)} color={theme.colors.primary} />
        </View>
      ) : (
        <>
          <Button
            mode="text"
            labelStyle={{ fontSize: ms(14) }}
            className="items-center justify-center"
            style={styles.btnForgetPassword}
            onPress={handleForgetPassword}>
            Forget Password?
          </Button>
          <Button
            mode="contained"
            className="items-center justify-center"
            labelStyle={{ fontSize: ms(14) }}
            contentStyle={styles.btnLogin}
            style={{ borderRadius: ms(50) }}
            onPress={handleLogin}>
            Login
          </Button>
        </>
      )}

      <Portal>
        <Dialog visible={visibleDialog} onDismiss={() => setVisibleDialog(false)}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{error}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleDialog(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textDisplayMedium: {
    fontSize: ms(45),
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: ms(52),
  },
  textBodyMedium: {
    fontSize: ms(14),
    fontWeight: '400',
    letterSpacing: ms(0.25),
    lineHeight: ms(20),
  },
  textInput: {
    width: hs(300),
    height: vs(56),
  },
  btnForgetPassword: { width: hs(175), height: vs(50) },
  btnLogin: {
    width: hs(100),
    height: vs(50),
  },
});
