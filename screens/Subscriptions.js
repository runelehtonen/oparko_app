// Subscriptions.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Subscriptions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Subscriptions Screen</Text>
      {/* Add your UI components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Subscriptions;
