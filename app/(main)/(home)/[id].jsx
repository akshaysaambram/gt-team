import useUserStore from 'app/store/userStore';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

import { vs, ms } from '../../../utils/metrics';

export default function Profile() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();

  const team = useUserStore((state) => state.team);
  const teamUser = team.find((user) => user.uid === id);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        padding: vs(12),
        backgroundColor: theme.colors.background,
      }}>
      <View className="flex-grow items-center justify-center p-4" style={{ gap: vs(16) }}>
        <Avatar.Text size={ms(124)} label={teamUser.XD} />
        <Text variant="headlineLarge" style={styles.textHeadlineLarge}>
          {teamUser.fullName}
        </Text>
        <Text variant="titleMedium" style={styles.textTitleMedium}>
          {teamUser.email}
        </Text>
        <Text variant="bodyMedium" style={styles.textBodyMedium}>
          {teamUser.role}
        </Text>
        <Text variant="bodyMedium" style={styles.textBodyMedium}>
          {teamUser.phoneNumber}
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
