import { AppRegistry, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { name as appName } from '../app.json';
import { hs, vs, ms } from '../utils/metrics';

export default function Index() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.main}>
        <View>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>Hello World</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>
            This is the first page of your app.
          </Text>
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>Show Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: ms(24),
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: ms(16),
    shadowColor: '#000',
    shadowOffset: {
      height: vs(2),
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: ms(16, 0.75),
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: ms(24),
  },
  main: {
    flex: 1,
    maxWidth: hs(960),
    marginHorizontal: 'auto',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: ms(64),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: ms(36),
  },
});

AppRegistry.registerComponent(appName, () => Index);
