import React, { useState } from 'react';
import { StyleSheet, View, PanResponder, Animated, Text } from 'react-native';
import { Colors } from './../components/styles';

const { primary, brand } = Colors;

const CardContent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>Aktiv Parkering</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardContentText}>
          Modtag løbende påmindelser om din igangværende parkering på et selvvalgt tidsinterval.
        </Text>
      </View>
    </View>
  </View>
);

const CardsStacked = () => {
  const colors = ['#5C6BC0', '#009688', '#F44336'];

  const [cardsPan] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [cardsStackedAnim] = useState(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (event, gestureState) => {
      cardsPan.setValue({ x: gestureState.dx, y: 0 });
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: (event, gestureState) => {
      Animated.timing(cardsPan, {
        toValue: { x: 0, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }).start();

      Animated.timing(cardsStackedAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        cardsStackedAnim.setValue(0);
        setCurrentIndex(currentIndex + 1);
      });
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 24,
        }}
      >
        <Animated.View
          style={{
            height: 200,
            borderRadius: 20,
            width: '100%',
            zIndex: 1,
            bottom: cardsStackedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 20],
            }),
            backgroundColor: 'white',
            transform: [
              {
                scale: cardsStackedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 0.9],
                }),
              },
            ],
            opacity: cardsStackedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.6],
            }),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        />
        <Animated.View
          style={{
            height: 200,
            borderRadius: 20,
            width: '100%',
            position: 'absolute',
            zIndex: 2,
            bottom: cardsStackedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
            backgroundColor: 'white',
            transform: [
              {
                scale: cardsStackedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1.0],
                }),
              },
            ],
            opacity: cardsStackedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.6, 1],
            }),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        />
        <Animated.View
          {...cardsPanResponder.panHandlers}
          style={{
            height: 200,
            borderRadius: 20,
            width: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            zIndex: cardsStackedAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [3, 2, 0],
            }),
            bottom: cardsStackedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 40],
            }),
            opacity: cardsStackedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.3],
            }),
            transform: [
              { translateX: cardsPan.x },
              {
                scale: cardsStackedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.8],
                }),
              },
            ],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: primary,
    borderRadius: 20,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 10,
  },

  cardHeaderText: {
    fontSize: 18,
    fontWeight: '400',
    color: brand,
  },

  cardContent: {
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default CardsStacked;
