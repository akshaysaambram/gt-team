import useAppStore from 'app/store/appStore';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { hs, vs, ms } from 'utils/metrics';

export default function Screen3() {
  const theme = useTheme();
  const router = useRouter();

  const setIsInitialLaunch = useAppStore((state) => state.setIsInitialLaunch);

  return (
    <View
      className="flex-1 items-center justify-center p-4"
      style={{ backgroundColor: theme.colors.background, gap: vs(12) }}>
      <View className="items-center gap-x-6">
        <Text style={[styles.title, { color: theme.colors.primary }]}>uGc</Text>
        <Text style={styles.subtitle}>Unity Growth Co.</Text>
      </View>
      <LottieView
        autoPlay
        style={{
          width: hs(250),
          height: vs(250),
        }}
        source={require('../../assets/Onboarding/skills.json')}
      />
      <Text className="text-center px-4" style={styles.textTitleMedium}>
        🚀 Unlock your full potential with Unity Growth Co.
      </Text>
      <Text className="text-center px-2" style={styles.textBodyMedium}>
        Access a treasure trove of resources, tutorials, and expert advice. Stay updated on the
        latest trends and technologies in the IT industry. Let's empower each other to reach new
        heights in our careers. Together, we grow stronger!
      </Text>
      <View className="flex-row items-center justify-stretch absolute bottom-2">
        <IconButton
          mode="outlined"
          icon="arrow-left"
          onPress={() => {
            router.replace('/screen2');
          }}
        />
        <Button
          className="flex-grow m-2 p-1"
          mode="contained"
          onPress={() => {
            setIsInitialLaunch();
            router.replace('/login');
          }}>
          Elevate Your Skills
        </Button>
      </View>
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
