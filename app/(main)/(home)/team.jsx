import useUserStore from 'app/store/userStore';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Avatar, Button, Card, useTheme } from 'react-native-paper';
import { db } from 'utils/firebase';
import { hs, vs, ms } from 'utils/metrics';

export default function Team() {
  const theme = useTheme();
  const router = useRouter();
  const swipeableRefs = useRef([]);

  const team = useUserStore((state) => state.team);
  const setTeam = useUserStore((state) => state.setTeam);
  const [openIndex, setOpenIndex] = useState(null);

  const renderRightActions = (index, uid) => () => {
    return (
      <View style={styles.rightActions}>
        <View style={styles.swipeableButtonContainer}>
          <Button
            mode="contained"
            onPress={() => {
              setOpenIndex(index === openIndex ? null : index);
              router.push(`/${uid}`);
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
      renderRightActions={renderRightActions(index, item.uid)}
      overshootRight={false}
      onSwipeableWillOpen={() => closeAllSwipesExcept(index)}>
      <Card style={{ margin: ms(8) }}>
        <Card.Title
          title={item.fullName}
          subtitle={item.role}
          left={(props) => <Avatar.Text {...props} size={ms(48)} label={item.XD} />}
          style={{ gap: ms(12) }}
        />
      </Card>
    </Swipeable>
  );

  async function getTeam() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const teamData = querySnapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
    setTeam(teamData);
  }

  useEffect(() => {
    getTeam();
  }, []);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        padding: ms(16),
        backgroundColor: theme.colors.background,
      }}>
      <View className="flex-grow">
        <FlatList data={team} keyExtractor={(item) => item.uid} renderItem={renderItem} />
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
