import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  List,
  Portal,
  RadioButton,
  Text,
  useTheme,
} from 'react-native-paper';

import useAppStore from '../store/appStore';

export default function Settings() {
  const theme = useTheme();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(false);
  const [dialogContent, setDialogContent] = useState(false);

  const themeScheme = useAppStore((state) => state.themeScheme);
  const setThemeScheme = useAppStore((state) => state.setThemeScheme);
  const animationLoop = useAppStore((state) => state.animationLoop);
  const setAnimationLoop = useAppStore((state) => state.setAnimationLoop);

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: theme.colors.background }}>
      <View className="">
        <List.Section className="">
          <List.Subheader style={{ color: theme.colors.primary }}>Display</List.Subheader>
          <Divider />
          <List.Item
            className="px-4"
            title="Theme"
            left={() => <List.Icon icon="theme-light-dark" />}
            onPress={() => {
              setDialogTitle('Theme');
              setDialogContent('Theme');
              setVisible(true);
            }}
          />
        </List.Section>
        <List.Section className="">
          <List.Subheader style={{ color: theme.colors.primary }}>Animation</List.Subheader>
          <Divider />
          <List.Item
            className="px-4"
            title="Animation Loop"
            left={() => <List.Icon icon="transition" />}
            onPress={() => {
              setDialogTitle('Animation Loop');
              setDialogContent('Animation Loop');
              setVisible(true);
            }}
          />
        </List.Section>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{dialogTitle}</Dialog.Title>
          <Dialog.Content>
            {dialogContent === 'Theme' ? (
              <RadioButton.Group
                className="gap-1"
                onValueChange={(newValue) => {
                  setThemeScheme(newValue);
                  setVisible(false);
                }}
                value={themeScheme}>
                <View className="flex-row gap-3">
                  <RadioButton value="light" />
                  <Text className="self-center">Light</Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <RadioButton value="dark" />
                  <Text>Dark</Text>
                </View>
              </RadioButton.Group>
            ) : (
              <RadioButton.Group
                className="gap-1"
                onValueChange={(newValue) => {
                  setAnimationLoop(newValue);
                  setVisible(false);
                }}
                value={animationLoop}>
                <View className="flex-row gap-3 ">
                  <RadioButton value="stop" />
                  <Text className="self-center">Stop</Text>
                </View>

                <View className="flex-row items-center gap-3">
                  <RadioButton value="loop" />
                  <Text>Loop</Text>
                </View>
              </RadioButton.Group>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

// const styles = StyleSheet.create({});
