import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

import { ms } from '../../../utils/metrics';

export default function Profile() {
  const theme = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center p-4 gap-y-3"
      style={{ backgroundColor: theme.colors.background }}>
      <Avatar.Text size={ms(124)} label="Ar" />
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
