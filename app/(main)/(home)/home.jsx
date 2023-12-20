import useUserStore from 'app/store/userStore';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Avatar, Button, IconButton, Text, useTheme } from 'react-native-paper';

import { hs, vs, ms } from '../../../utils/metrics';
import useAppStore from '../../store/appStore';

export default function Home() {
  const theme = useTheme();
  const router = useRouter();

  const userDoc = useUserStore((state) => state.authUserDoc);
  const animationLoop = useAppStore((state) => state.animationLoop) === 'loop';

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        padding: ms(12),
        backgroundColor: theme.colors.background,
      }}>
      <View className="flex-grow" style={{ gap: vs(12) }}>
        <View className="flex-row items-center justify-between px-4">
          <Skeleton show={userDoc.XD === null} height={ms(56)} width={ms(56)} radius="round">
            <Avatar.Text size={ms(56)} label={userDoc.XD} />
          </Skeleton>
          <IconButton icon="account" size={ms(20)} onPress={() => router.push('/profile')} />
        </View>
        <Skeleton.Group show={userDoc.firstName === null}>
          <View className="px-4">
            <Skeleton height={vs(52)} width={hs(250)}>
              <Text variant="displaySmall" style={styles.textDisplaySmall}>
                Hello {userDoc.firstName},
              </Text>
            </Skeleton>
            <Skeleton height={vs(24)} width={hs(200)}>
              <Text variant="bodyMedium" style={styles.textBodyMedium}>
                {userDoc.role}
              </Text>
            </Skeleton>
            <Skeleton height={vs(24)} width={hs(150)}>
              <Text variant="bodyMedium" style={styles.textBodyMedium}>
                {userDoc.phoneNumber}
              </Text>
            </Skeleton>
          </View>
        </Skeleton.Group>
        <View className="items-center">
          <LottieView
            autoPlay
            loop={animationLoop}
            style={{
              width: hs(200),
              height: vs(200),
            }}
            source={require('../../../assets/lottie-files/home.json')}
          />
        </View>
        <View className="p-3">
          <Text className="text-center" variant="bodyLarge" style={styles.textBodyLarge}>
            Through hard work and shared endeavors, we sow the seeds of collective success. In
            unity, we not only grow stronger individually but also flourish together.
          </Text>
        </View>
        <View className="flex-row items-center justify-center mb-3 gap-x-4">
          <Button mode="contained" style={styles.btn}>
            LinkedIn
          </Button>
          <Button mode="outlined" style={styles.btn} onPress={() => router.push('/team')}>
            Team
          </Button>
        </View>
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
  textBodyLarge: {
    fontSize: ms(16),
    fontWeight: '400',
    letterSpacing: ms(0.15),
    lineHeight: ms(24),
  },
  textBodyMedium: {
    fontSize: ms(14),
    fontWeight: '400',
    letterSpacing: ms(0.25),
    lineHeight: ms(20),
  },
  btn: {},
});
