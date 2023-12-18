import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, TextInput, useTheme } from 'react-native-paper';

import { hs, vs, ms } from 'utils/metrics';

export default function EditProfile() {
  const theme = useTheme();
  const router = useRouter();
  const [userDoc, setUserDoc] = useState({
    fullName: 'Akshay Saambram',
    email: 'akshay.saambram@gmail.com',
    role: 'Machine Learning Engineer',
    phoneNumber: '934785546',
  });

  return (
    <View
      className="flex-1 items-center justify-center p-4 gap-y-3"
      style={{ backgroundColor: theme.colors.background }}>
      <Avatar.Text className="self-center" size={ms(124)} label="Ar" />
      <TextInput
        label="Fullname"
        placeholder="Fullname"
        mode="outlined"
        value={userDoc.fullName}
        onChangeText={(txt) => setUserDoc({ ...userDoc, fullName: txt })}
        style={styles.textInput}
      />
      <TextInput
        label="Email"
        placeholder="Email"
        mode="outlined"
        value={userDoc.email}
        onChangeText={(txt) => setUserDoc({ ...userDoc, email: txt })}
        style={styles.textInput}
      />
      <TextInput
        label="Role"
        placeholder="Role"
        mode="outlined"
        value={userDoc.role}
        onChangeText={(txt) => setUserDoc({ ...userDoc, role: txt })}
        style={styles.textInput}
      />
      <TextInput
        label="Phone Number"
        placeholder="Phone Number"
        mode="outlined"
        value={userDoc.phoneNumber}
        onChangeText={(txt) => setUserDoc({ ...userDoc, phoneNumber: txt })}
        keyboardType="number-pad"
        style={styles.textInput}
      />
      <Button mode="contained" onPress={() => router.back()}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: hs(300),
    height: vs(64),
  },
});
