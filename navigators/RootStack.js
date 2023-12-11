import React from 'react';

import { Colors } from './../components/styles';
const { primary, tertiary } = Colors;

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Start from './../screens/Start';
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Verification from '../screens/EmailVerification';
import Onboarding from '../components/Onboarding';

const Stack = createNativeStackNavigator();

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Start"
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: 'tetiary',
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
          >
            {storedCredentials ? (
              <>
                <Stack.Screen options={{ headerTintColor: primary }} name="Welcome" component={Welcome} />
              </>
            ) : (
              <>
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Verification" component={Verification} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
