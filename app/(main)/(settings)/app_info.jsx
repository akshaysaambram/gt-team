import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

import { vs, ms } from '../../../utils/metrics';

export default function AppInfo() {
  const theme = useTheme();

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        padding: vs(12),
        backgroundColor: theme.colors.background,
      }}>
      <View className="flex-grow items-center justify-center" style={{ gap: vs(12) }}>
        <Text variant="displayMedium" style={styles.textDisplayMedium}>
          uGc
        </Text>
        <Text variant="bodyLarge" style={styles.textBodyLarge}>
          Unity Growth Co.
        </Text>
        <Text className="mb-4" variant="bodyMedium" style={styles.textBodyMedium}>
          Version: 1.0.0
        </Text>
        <View
          className="items-center justify-center mb-4 p-4"
          style={{
            backgroundColor: theme.colors.onBackground,
            borderRadius: ms(18),
          }}>
          <Text
            variant="bodyLarge"
            style={[styles.textBodyLarge, { color: theme.colors.background }]}>
            uGc
          </Text>
        </View>
        <View className="flex-row items-center justify-center gap-x-1">
          <Icon className="self-center" source="copyright" size={ms(16)} />
          <Text variant="bodyMedium" style={styles.textBodyMedium}>
            2010-2023 Unity Growth Co.
          </Text>
        </View>
      </View>
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
});
