import React from 'react';
import { View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

import { ms } from '../../../utils/metrics';

export default function AppInfo() {
  const theme = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center gap-y-4"
      style={{ backgroundColor: theme.colors.background }}>
      <View className="items-center gap-y-2">
        <Text variant="displayMedium">uGc</Text>
        <Text variant="bodyLarge">Unity Growth Co.</Text>
        <Text className="mb-4" variant="bodyMedium">
          Version: 1.0.0
        </Text>
        <View
          className="items-center justify-center mb-4 p-4"
          style={{
            backgroundColor: theme.colors.onBackground,

            borderRadius: ms(16),
          }}>
          <Text variant="bodyLarge" style={{ color: theme.colors.background }}>
            uGc
          </Text>
        </View>
        <View className="flex-row items-center justify-center gap-x-1">
          <Icon className="self-center" source="copyright" size={ms(16)} />
          <Text variant="bodyMedium">2010-2023 Unity Growth Co.</Text>
        </View>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({});
