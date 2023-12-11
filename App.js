import React, { useState, useEffect } from 'react';

// splash screen
import * as SplashScreen from 'expo-splash-screen';

// React Navigation stack
import RootStack from './navigators/RootStack';

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './components/CredentialsContext';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  const checkLoginCredentials = async () => {
    try {
      const result = await AsyncStorage.getItem('oparkoAppCredentials');
      if (result !== null) {
        setStoredCredentials(JSON.parse(result));
      } else {
        setStoredCredentials(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await checkLoginCredentials();
        setAppReady(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    init();
  }, []);

  if (!appReady) {
    return null; // You can return a loading indicator or any other UI element here
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}
