import React from 'react';

import { Colors } from './../components/styles';
const { primary, tertiary } = Colors;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Start from './../screens/Start';
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Verification from '../screens/EmailVerification';
import Onboarding from '../components/Onboarding';
import BuyPermit from '../screens/BuyPermit';
import Subscriptions from '../screens/Subscriptions';
import Support from '../screens/Support';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();

import { CredentialsContext } from './../components/CredentialsContext';

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={storedCredentials ? 'Welcome' : 'Onboarding'}
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: tertiary,
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
          >
            {storedCredentials ? (
              <>
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerTintColor: primary }} />
                <Stack.Screen name="Verification" component={Verification} />
                <Stack.Screen name="BuyPermit" component={BuyPermit} />
                <Stack.Screen name="Subscriptions" component={Subscriptions} />
                <Stack.Screen name="Support" component={Support} />
                <Stack.Screen name="Settings" component={Settings} />
              </>
            ) : (
              <>
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
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
