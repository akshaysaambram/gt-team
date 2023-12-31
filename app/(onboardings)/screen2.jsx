import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { hs, vs, ms } from 'utils/metrics';

export default function Screen2() {
  const theme = useTheme();
  const router = useRouter();

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
        source={require('../../assets/Onboarding/connect.json')}
      />

      <Text className="text-center px-4" style={styles.textTitleMedium}>
        🤝 Unity Growth Co. is your hub for collaborative growth in the IT realm.
      </Text>
      <Text className="text-center px-2" style={styles.textBodyMedium}>
        Connect with like-minded individuals, share insights, and collaborate on projects. Whether
        you're a seasoned professional or just starting your journey, there's something for
        everyone. Let's elevate our skills and careers together!
      </Text>
      <View className="flex-row items-center justify-stretch absolute bottom-2">
        <IconButton
          mode="outlined"
          icon="arrow-left"
          onPress={() => {
            router.replace('/screen1');
          }}
        />
        <Button className="flex-grow m-2 p-1" mode="contained">
          Connect & Collaborate
        </Button>
        <IconButton
          mode="outlined"
          icon="arrow-right"
          onPress={() => {
            router.replace('/screen3');
          }}
        />
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
