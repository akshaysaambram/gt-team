import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

import useAppStore from './store/appStore';
import { hs, vs, ms } from '../utils/metrics';

export default function Login() {
  const theme = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const animationLoop = useAppStore((state) => state.animationLoop) === 'loop';

  function handleLogin() {
    router.replace('/(main)/home');
  }

  return (
    <View
      className="flex-1 items-center justify-center gap-y-3"
      style={{ backgroundColor: theme.colors.background }}>
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
          value={email}
          onChangeText={(txt) => setEmail(txt)}
          style={styles.textInput}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={(txt) => setPassword(txt)}
          style={styles.textInput}
        />
      </View>
      <Button className="items-center justify-center" mode="text" style={styles.btnForgetPassword}>
        Forget Password?
      </Button>
      <Button
        className="items-center justify-center"
        mode="contained"
        style={styles.btnLogin}
        onPress={handleLogin}>
        Login
      </Button>
    </View>
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
    // width: hs(100),
    // height: vs(50),
    transform: [{ scale: ms(1) }],
  },
});
