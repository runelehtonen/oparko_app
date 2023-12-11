import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingItem from '../components/OnboardingItem';
import SlideIndicator from '../components/SlideIndicator';
import OnboardingButton from '../components/OnboardingButton';
import slides from '../slides';
import { Colors } from './../components/styles';

// Colors
const { lightGray } = Colors;

export default Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const navigation = useNavigation();

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log('Last item');
      navigation.navigate('Start');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Start' }],
      });
    }
  };

  const skipOnboarding = () => {
    navigation.navigate('Start');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Start' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 4 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <SlideIndicator data={slides} scrollX={scrollX} />
      <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      <OnboardingButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    bottom: 65,
    right: 60,
  },
  skipButtonText: {
    color: lightGray,
    fontSize: 16,
  },
});
