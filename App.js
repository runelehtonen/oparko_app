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
          // User is already logged in, retrieve credentials and set them
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
    return null; // You can return a loading indicator or any other UI element here
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}
