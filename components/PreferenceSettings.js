import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Switch, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './../components/styles';

// Colors
const { darkLight, primary, brand, tertiary } = Colors;

const PreferenceSettings = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.actions}>
      <TouchableOpacity>
        <View style={styles.extraView}>
          <Ionicons name="moon-outline" size={20} color={darkLight} />
          <Text style={styles.extraText}>Dark mode </Text>
          <Switch
            thumbColor={darkMode ? Colors.primary : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#025578' }}
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity>
        <View style={styles.extraView}>
          <Ionicons name="globe" size={20} color={darkLight} />
          <Text style={styles.extraText}>Sprog </Text>
          <Ionicons name="ios-arrow-forward" size={20} color={darkLight} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PreferenceSettings;

const styles = StyleSheet.create({
  extraView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: darkLight,
    opacity: 0.3,
    marginVertical: 1,
  },
  actions: {
    padding: 0,
  },
  extraText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: tertiary,
    fontSize: 15,
    marginLeft: 10,
    flex: 1,
  },
});
