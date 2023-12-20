import useUserStore from 'app/store/userStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, ActivityIndicator, Button, TextInput, useTheme } from 'react-native-paper';
import { auth, db } from 'utils/firebase';
import { hs, vs, ms } from 'utils/metrics';

export default function EditProfile() {
  const theme = useTheme();
  const router = useRouter();
  const { firstLogin } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);
  const userDoc = useUserStore((state) => state.authUserDoc);
  const setUserDoc = useUserStore((state) => state.setAuthUserDoc);

  async function handleOnSave() {
    setLoading(true);
    await updateProfile(auth.currentUser, {
      displayName: userDoc.fullName,
      photoURL: userDoc.photoURL,
    });

    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      ...userDoc,
    }).then(() => (router.canGoBack() ? router.back() : router.replace('/(main)/(home)/home')));
    setLoading(false);
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        padding: ms(16),
        backgroundColor: theme.colors.background,
      }}>
      <View className="flex-grow items-center justify-center" style={{ gap: vs(24) }}>
        <Avatar.Text className="self-center" size={ms(124)} label={userDoc.XD} />

        <TextInput
          label="XD"
          placeholder="XD"
          mode="outlined"
          textContentType="nickname"
          value={userDoc.XD}
          onChangeText={(txt) => setUserDoc({ ...userDoc, XD: txt })}
          style={styles.textInput}
        />
        <TextInput
          label="First Name"
          placeholder="First Name"
          mode="outlined"
          textContentType="name"
          value={userDoc.firstName}
          onChangeText={(txt) =>
            setUserDoc({ ...userDoc, firstName: txt, fullName: `${txt} ${userDoc.lastName}` })
          }
          style={styles.textInput}
        />
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          mode="outlined"
          textContentType="name"
          value={userDoc.lastName}
          onChangeText={(txt) =>
            setUserDoc({ ...userDoc, lastName: txt, fullName: `${userDoc.firstName} ${txt}` })
          }
          style={styles.textInput}
        />
        <TextInput
          label="Full Name"
          placeholder="Full Name"
          mode="outlined"
          textContentType="name"
          value={userDoc.fullName}
          onChangeText={(txt) => setUserDoc({ ...userDoc, displayName: txt, fullName: txt })}
          style={styles.textInput}
        />
        <TextInput
          label="Email"
          placeholder="Email"
          mode="outlined"
          textContentType="emailAddress"
          readOnly
          value={userDoc.email}
          onChangeText={(txt) => setUserDoc({ ...userDoc, email: txt })}
          style={styles.textInput}
        />
        <TextInput
          label="Role"
          placeholder="Role"
          mode="outlined"
          textContentType="jobTitle"
          value={userDoc.role}
          onChangeText={(txt) => setUserDoc({ ...userDoc, role: txt })}
          style={styles.textInput}
        />
        <TextInput
          label="Phone Number"
          placeholder="Phone Number"
          mode="outlined"
          textContentType="telephoneNumber"
          value={userDoc.phoneNumber}
          onChangeText={(txt) => setUserDoc({ ...userDoc, phoneNumber: txt })}
          keyboardType="number-pad"
          style={styles.textInput}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button mode="contained" style={styles.btnSave} onPress={handleOnSave}>
            Save
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: hs(300),
    height: vs(64),
  },
  btnSave: {
    transform: [{ scale: ms(1) }],
  },
});
