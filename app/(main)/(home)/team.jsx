import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Avatar, Button, Card } from 'react-native-paper';
import { hs, vs, ms } from 'utils/metrics';

export default function Team() {
  const swipeableRefs = useRef([]);
  const router = useRouter();

  const [openIndex, setOpenIndex] = useState(null);

  const renderRightActions = (index) => (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 75, 100],
      outputRange: [0, 0.5, 1],
    });

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

  const renderItem = ({ item, index }) => (
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

  return (
    <View>
      <FlatList
        data={Array.from({ length: 4 })}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
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
