import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Switch, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './../components/styles';
import { CredentialsContext } from './../components/CredentialsContext'; // Import the authentication context

// Colors
const { darkLight, primary, tertiary } = Colors;

const PreferenceSettings = () => {
  const { storedCredentials } = useContext(CredentialsContext);
  const { userId, token } = storedCredentials;

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState(''); // Set the initial language value

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        if (userId && token) {
          const response = await fetch(`http://192.168.0.64:3000/user/preference-settings/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `${token}`,
            },
          });

          const data = await response.json();

          if (data.status === 'SUCCESS') {
            setDarkMode(data.data.preferenceSettings.darkMode || false);
            setLanguage(data.data.preferenceSettings.language || '');
          } else {
            console.error('Failed to fetch preferences:', data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, [userId, token]);

  const updatePreferenceSettings = async (newDarkMode) => {
    try {
      const response = await fetch(`http://192.168.0.64:3000/user/update-preference-settings/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ preferenceSettings: { darkMode: newDarkMode } }),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (data.status === 'SUCCESS') {
        console.log('Preference settings updated successfully:', data.data);
      } else {
        console.error('Failed to update preference settings:', data.message);
      }
    } catch (error) {
      console.error('Error updating preference settings:', error);
    }
  };

  const handleDarkModeToggle = () => {
    const newDarkModeValue = !darkMode;
    setDarkMode(newDarkModeValue);
    updatePreferenceSettings(newDarkModeValue);
  };

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
            onValueChange={handleDarkModeToggle}
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
