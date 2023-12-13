import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Avatar, Button, IconButton, Text, useTheme } from 'react-native-paper';

import { hs, vs, ms } from '../../../utils/metrics';

import LottieView from 'lottie-react-native';

import useAppStore from '../../store/appStore';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();

  const animationLoop = useAppStore((state) => state.animationLoop) === 'loop';

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: theme.colors.background,
      }}>
      <View className="flex-row items-center justify-between p-4">
        <Avatar.Text size={56} label="Ar" />
        <IconButton icon="account" size={20} onPress={() => console.log('Pressed')} />
      </View>
      <View className="px-4">
        <Text variant="displaySmall" style={styles.textDisplaySmall}>
          Hello Akshay,
        </Text>
        <Text variant="bodyMedium" style={styles.textBodyMedium}>
          Machine Learning Engineer
        </Text>
        <Text variant="bodyMedium" style={styles.textBodyMedium}>
          9347855546
        </Text>
      </View>
      <View className="items-center p-3">
        <LottieView
          autoPlay
          loop={animationLoop}
          style={{
            width: hs(200),
            height: vs(200),
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('../../../assets/lottie-files/home.json')}
        />
      </View>
      <View className="p-3">
        <Text className="text-center" variant="bodyLarge" style={styles.textBodyLarge}>
          Through hard work and shared endeavors, we sow the seeds of collective success. In unity,
          we not only grow stronger individually but also flourish together.
        </Text>
      </View>
      <View className="flex-row items-center justify-center mb-3 gap-3">
        <Button mode="contained">LinkedIn</Button>
        <Button mode="outlined" onPress={() => router.replace('/login')}>
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textDisplaySmall: {
    fontSize: ms(36),
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: ms(44),
  },
  textBodyMedium: {
    fontSize: ms(14),
    fontWeight: '400',
    letterSpacing: ms(0.25),
    lineHeight: ms(20),
  },
  textBodyLarge: {
    fontSize: ms(16),
    fontWeight: '400',
    letterSpacing: ms(0.15),
    lineHeight: ms(24),
  },
});
