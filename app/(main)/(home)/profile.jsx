import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Avatar, IconButton, Text, useTheme } from 'react-native-paper';

import { ms } from '../../../utils/metrics';

export default function Profile() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      className="flex-1 items-center justify-center p-4 gap-y-3"
      style={{ backgroundColor: theme.colors.background }}>
      <View className="w-full relative">
        <Avatar.Text className="self-center" size={ms(124)} label="Ar" />
        <IconButton
          className="absolute bottom-0 right-0"
          icon="account-edit"
          size={ms(26)}
          onPress={() => router.push('/edit_profile')}
        />
      </View>
      <Text variant="headlineLarge">Akshay Saambram</Text>
      <Text variant="titleMedium">akshaysaambram@gmail.com</Text>
      <Text variant="bodyMedium">Machine Learning Engineer</Text>
      <Text variant="bodyMedium">9347855546</Text>
    </View>
  );
}

// const styles = StyleSheet.create({});
