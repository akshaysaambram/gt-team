import useUserStore from 'app/store/userStore';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Avatar,
  ActivityIndicator,
  Button,
  RadioButton,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { auth, db, storage } from 'utils/firebase';
import { hs, vs, ms } from 'utils/metrics';
import { useShallow } from 'zustand/react/shallow';

export default function EditProfile() {
  const theme = useTheme();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [userDoc, setUserDoc] = useUserStore(
    useShallow((state) => [state.authUserDoc, state.setAuthUserDoc])
  );

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState(false);

  async function updateUserProfile(name, url) {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    });
  }

  async function pickImage() {
    setImageLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    async function uploadImageAsync(uri) {
      const response = await fetch(uri);
      const blob = await response.blob();

      const fileRef = ref(storage, `images/${userDoc.uid}`);
      await uploadBytes(fileRef, blob);

      return await getDownloadURL(fileRef);
    }

    if (!result.canceled) {
      const uploadURL = await uploadImageAsync(result.assets[0].uri);
      setUserDoc({ ...userDoc, photoURL: uploadURL });

      await updateUserProfile(userDoc.displayName, uploadURL);

      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        ...userDoc,
        photoURL: uploadURL,
      });

      setSnackbarText('Image uploaded successfully');
      setVisibleSnackbar(true);

      try {
      } catch (error) {
        console.error('Error updating profile and user document:', error);
      }
    }
    setImageLoading(false);
  }

  async function deleteImage() {
    setImageLoading(true);
    const deleteRef = ref(storage, userDoc.photoURL);

    try {
      await deleteObject(deleteRef);
      setUserDoc({ ...userDoc, photoURL: null });

      await updateUserProfile(userDoc.displayName, null);

      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        ...userDoc,
        photoURL: null,
      });

      setSnackbarText('Image deleted successfully');
      setVisibleSnackbar(true);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
    setImageLoading(false);
  }

  async function handleOnSave() {
    setLoading(true);
    setUserDoc({ ...userDoc, isFilled: true });
    await updateUserProfile(userDoc.displayName, userDoc.photoURL);

    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      ...userDoc,
      isFilled: true,
    }).then(() => (router.canGoBack() ? router.back() : router.replace('/(main)/(home)/home')));
    setLoading(false);
  }

  return (
    <>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          padding: ms(16),
          backgroundColor: theme.colors.background,
        }}>
        <View className="flex-grow items-center justify-center" style={{ gap: vs(24) }}>
          {imageLoading ? (
            <ActivityIndicator
              style={{ padding: vs(52) }}
              size={ms(36)}
              color={theme.colors.primary}
            />
          ) : (
            <TouchableOpacity onPress={pickImage} onLongPress={userDoc.photoURL && deleteImage}>
              {userDoc.photoURL === null ? (
                <Avatar.Text className="self-center" size={ms(124)} label={userDoc.XD} />
              ) : (
                <Avatar.Image size={ms(124)} source={{ uri: userDoc.photoURL }} />
              )}
            </TouchableOpacity>
          )}

          <TextInput
            label="XD"
            placeholder="XD"
            mode="outlined"
            textContentType="nickname"
            value={userDoc.XD}
            maxLength={2}
            onChangeText={(txt) => {
              setUserDoc({ ...userDoc, XD: txt });
            }}
            style={styles.textInput}
          />
          <TextInput
            label="First Name"
            placeholder="First Name"
            mode="outlined"
            textContentType="name"
            value={userDoc.firstName}
            onChangeText={(txt) =>
              setUserDoc({
                ...userDoc,
                firstName: txt,
                fullName: `${txt} ${userDoc.lastName === null ? '' : userDoc.lastName}`,
                displayName: `${txt} ${userDoc.lastName === null ? '' : userDoc.lastName}`,
              })
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
              setUserDoc({
                ...userDoc,
                lastName: txt,
                fullName: `${userDoc.firstName === null ? '' : userDoc.firstName} ${txt}`,
                displayName: `${userDoc.firstName === null ? '' : userDoc.firstName} ${txt}`,
              })
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
          <View className="w-full px-8 gap-x-3" style={{ gap: vs(12) }}>
            <Text>Gender:</Text>
            <RadioButton.Group
              onValueChange={(value) => setUserDoc({ ...userDoc, gender: value })}
              value={userDoc.gender}>
              <View className="flex-row justify-between px-4">
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Android value="male" />
                  <Text>Male</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Android value="female" />
                  <Text>Female</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Android value="other" />
                  <Text>Other</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
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
            maxLength={10}
            textContentType="telephoneNumber"
            value={userDoc.phoneNumber}
            onChangeText={(txt) => {
              if ('0123456789'.includes(txt.charAt(txt.length - 1)))
                setUserDoc({ ...userDoc, phoneNumber: txt });
            }}
            keyboardType="number-pad"
            style={styles.textInput}
          />
          <TextInput
            label="Bio"
            placeholder="Bio"
            mode="outlined"
            value={userDoc.bio}
            onChangeText={(txt) => setUserDoc({ ...userDoc, bio: txt })}
            style={styles.textInput}
          />
          <TextInput
            label="LinkedIn"
            placeholder="LinkedIn"
            mode="outlined"
            value={userDoc.linkedIn}
            onChangeText={(txt) => setUserDoc({ ...userDoc, linkedIn: txt })}
            style={styles.textInput}
          />
          {loading ? (
            <ActivityIndicator size={ms(36)} color={theme.colors.primary} />
          ) : (
            <Button mode="contained" style={styles.btnSave} onPress={handleOnSave}>
              Save
            </Button>
          )}
        </View>
      </ScrollView>
      <Snackbar
        className="absolute bottom-0 z-10"
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        action={{
          label: 'Undo',
          onPress: () => setVisibleSnackbar(false),
        }}>
        {snackbarText}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: hs(300),
    height: vs(56),
  },
  btnSave: {
    transform: [{ scale: ms(1) }],
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
