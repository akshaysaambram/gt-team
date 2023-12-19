import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

import useAppStore from './store/appStore';
import { auth } from '../utils/firebase';
import { hs, vs, ms } from '../utils/metrics';

export default function Login() {
  const theme = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('akshaysaambram@gmail.com');
  const [password, setPassword] = useState('Akshay123');
  const [secureText, setSecureText] = useState(true);

  const animationLoop = useAppStore((state) => state.animationLoop) === 'loop';

  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
      <Button
        mode="text"
        labelStyle={{ fontSize: ms(14) }}
        className="items-center justify-center"
        style={styles.btnForgetPassword}>
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
    height: vs(64),
  },
  btnForgetPassword: { width: hs(175), height: vs(50) },
  btnLogin: {
    width: hs(100),
    height: vs(50),
  },
});
