import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, IconButton, Text, useTheme } from 'react-native-paper';

import { vs, ms } from '../../../utils/metrics';

export default function Profile() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        padding: ms(16),
        backgroundColor: theme.colors.background,
      }}>
      <View className="flex-grow items-center justify-center" style={{ gap: vs(16) }}>
        <View className="w-full relative">
          <Avatar.Text className="self-center" size={ms(124)} label="Ar" />
          <IconButton
            className="absolute bottom-0 right-0"
            icon="account-edit"
            size={ms(26)}
            onPress={() => router.push('/edit_profile')}
          />
        </View>
        <Text variant="headlineLarge" style={styles.textHeadlineLarge}>
          Akshay Saambram
        </Text>
        <Text variant="titleMedium" style={styles.textTitleMedium}>
          akshaysaambram@gmail.com
        </Text>
        <Text variant="bodyMedium" style={styles.textBodyMedium}>
          Machine Learning Engineer
        </Text>
        <Text variant="bodyMedium" style={styles.textBodyMedium}>
          9347855546
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textHeadlineLarge: {
    fontSize: ms(24),
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: ms(32),
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
