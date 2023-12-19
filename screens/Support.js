// Support.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Support = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.underDev}>404</Text>
      <Text style={styles.pageTitle}>Support</Text>
      <Text style={styles.text}>er i øjeblikket under udvikling</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underDev: {
    fontSize: 50,
  },
  pageTitle: {
    fontSize: 30,
    color: '#025578',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    maxWidth: '80%',
    textAlign: 'center',
  },
});

export default Support;
