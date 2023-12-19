import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import RootStack from './navigators/RootStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);

  const checkLoginCredentials = async () => {
    try {
      const result = await AsyncStorage.getItem('oparkoAppToken');
      return result !== null;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const isLoggedIn = await checkLoginCredentials();

        if (isLoggedIn) {
          const storedToken = await AsyncStorage.getItem('oparkoAppToken');
          const storedUserString = await AsyncStorage.getItem('oparkoAppUser');
          const storedUser = JSON.parse(storedUserString);

          setStoredCredentials({ token: storedToken, userId: storedUser.userId });
        }

        setAppReady(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    init();
  }, []);

  if (!appReady) {
    return null; // TODO add a loading indicator
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}
