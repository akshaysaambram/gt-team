import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { hs, vs, ms } from 'utils/metrics';

export default function Screen1() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      className="flex-1 items-center justify-evenly p-4"
      style={{ backgroundColor: theme.colors.background, gap: vs(12) }}>
      <View className="items-center gap-x-6">
        <Text style={[styles.title, { color: theme.colors.primary }]}>uGc</Text>
        <Text style={styles.subtitle}>Unity Growth Co.</Text>
      </View>
      <LottieView
        autoPlay
        style={{
          width: hs(200),
          height: vs(200),
        }}
        source={require('../../assets/Onboarding/together.json')}
      />
      <Text className="text-center px-4" style={styles.textTitleMedium}>
        🌱 Grow Together with Unity Growth Co.
      </Text>
      <Text className="text-center" style={styles.textBodyMedium}>
        🌐 Embark on a journey of mutual growth, where individuals like you come together to share
        knowledge, skills, and experiences. Our community is built on the principle that we can
        achieve more by supporting each other. Let's connect, collaborate, and thrive together in
        the world of IT.
      </Text>
      <Button className="w-full p-1" mode="contained" onPress={() => router.replace('/screen2')}>
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: ms(56),
  },
  subtitle: {
    fontSize: ms(16),
  },
  textTitleMedium: {
    fontSize: ms(16),
    fontWeight: '500',
    letterSpacing: ms(0.15),
    lineHeight: ms(24),
  },
  textBodyMedium: {
    fontSize: ms(14),
    fontWeight: '400',
    letterSpacing: ms(0.25),
    lineHeight: ms(20),
  },
});
