import React from 'react';
import { View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

import { ms } from '../../../utils/metrics';

export default function Profile() {
  const theme = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center p-4 gap-y-3"
      style={{ backgroundColor: theme.colors.background }}>
      <Avatar.Text size={ms(142)} label="Ar" />
      <Text variant="headlineLarge">Akshay Saambram</Text>
      <Text variant="titleMedium">akshaysaambram@gmail.com</Text>
      <Text variant="bodyMedium">Machine Learning Engineer</Text>
      <Text variant="bodyMedium">9347855546</Text>
    </View>
  );
}

// const styles = StyleSheet.create({});
