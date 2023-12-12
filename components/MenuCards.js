import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MenuCards = () => {
  const navigation = useNavigation();

  const goToBuyPermit = () => {
    navigation.navigate('BuyPermit');
  };

  const goToSubscriptions = () => {
    navigation.navigate('Subscriptions');
  };

  const goToSupport = () => {
    navigation.navigate('Support');
  };

  return (
    <View style={styles.cardsContainer}>
      {/* Card 1 */}
      <TouchableOpacity onPress={goToBuyPermit} style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="parking" size={36} color="#025578" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardHeader}>Køb parkeringstilladelse</Text>
            <Text style={styles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Card 2 */}
      <TouchableOpacity onPress={goToSubscriptions} style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="clock" size={36} color="#025578" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardHeader}>Abonnementer</Text>
            <Text style={styles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Card 3 */}
      <TouchableOpacity onPress={goToSupport} style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="headset" size={36} color="#025578" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardHeader}>Support & Hjælp</Text>
            <Text style={styles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MenuCards;

const styles = StyleSheet.create({
  cardsContainer: {
    paddingTop: 16,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  iconContainer: {
    width: 60,
    alignItems: 'center',
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: '400',
    color: '#424242',
  },
  cardText: {
    fontSize: 14,
    color: '#424242',
  },
});
