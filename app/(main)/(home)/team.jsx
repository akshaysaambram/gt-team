import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Avatar, Button, Card, useTheme } from 'react-native-paper';
import { hs, vs, ms } from 'utils/metrics';

export default function Team() {
  const theme = useTheme();
  const router = useRouter();
  const swipeableRefs = useRef([]);

  const [openIndex, setOpenIndex] = useState(null);

  const renderRightActions = (index) => () => {
    return (
      <View style={styles.rightActions}>
        <View style={styles.swipeableButtonContainer}>
          <Button
            mode="contained"
            onPress={() => {
              setOpenIndex(index === openIndex ? null : index);
              router.push('/[id]');
            }}>
            Explore
          </Button>
        </View>
      </View>
    );
  };

  const closeAllSwipesExcept = (index) => {
    swipeableRefs.current.forEach((swipeable, i) => {
      if (swipeable && swipeable.close && i !== index) {
        swipeable.close();
      }
    });
  };

  const renderItem = ({ index }) => (
    <Swipeable
      ref={(ref) => (swipeableRefs.current[index] = ref)}
      renderRightActions={renderRightActions(index)}
      overshootRight={false}
      onSwipeableWillOpen={() => closeAllSwipesExcept(index)}>
      <Card style={{ margin: ms(8) }}>
        <Card.Title
          title="Akshay Saambram"
          subtitle="Machine Learning Engineer"
          left={(props) => <Avatar.Text {...props} size={ms(48)} label="Ar" />}
        />
      </Card>
    </Swipeable>
  );

  // useCallback(() => {
  //   const closeAllSwipes = () => {
  //     swipeableRefs.current.forEach((swipeable) => {
  //       if (swipeable && swipeable.close) {
  //         swipeable.close();
  //       }
  //     });
  //   };

  //   closeAllSwipes();
  //   setOpenIndex(null);
  // }, []);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        padding: ms(16),
        backgroundColor: theme.colors.background,
      }}>
      <View className="flex-grow">
        <FlatList
          data={Array.from({ length: 14 })}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rightActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  swipeableButtonContainer: {
    marginVertical: vs(4),
    marginHorizontal: hs(8),
  },
});
