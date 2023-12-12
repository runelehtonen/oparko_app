import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import MenuCards from './../components/MenuCards';
import { useNavigation } from '@react-navigation/native';

import { DefaultContainer, StyledButton, ButtonText, Colors, Avatar } from './../components/styles';

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

// Colors
const { brand, darkLight, light, secondary, primary } = Colors;

const Welcome = () => {
  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { userId, token } = storedCredentials;
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);

  const clearLogin = async () => {
    try {
      await AsyncStorage.removeItem('oparkoAppToken');
      await AsyncStorage.removeItem('oparkoAppUser');
      // Add any other items you want to remove

      setStoredCredentials(null);
    } catch (error) {
      console.log(error);
    }
  };

  const goToSettings = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId && token) {
        try {
          const response = await fetch(`http://192.168.0.64:3000/user/profile/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `${token}`,
            },
          });

          const result = await response.json();

          if (result.status === 'SUCCESS') {
            setUserInfo(result.data);
          } else {
            // Handle error, maybe user not found or unauthorized
          }
        } catch (error) {
          console.error('Error fetching user information:', error);
        }
      }
    };

    // Fetch user information whenever userId or token changes
    fetchUserInfo();
  }, [userId, token]);

  return (
    <>
      <StatusBar style="dark" />
      <DefaultContainer>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.PageTitle}>Velkommen</Text>
            <Text style={styles.SubTitle}>{userInfo?.name || 'Loading...'}</Text>
            <Text style={userInfo ? styles['SubTitle.email'] : styles.SubTitle}>{userInfo?.email || 'Loading...'}</Text>
          </View>
          <TouchableOpacity onPress={goToSettings} style={styles.avatarContainer}>
            <Octicons style={styles.Avatar} name="feed-person" size={40} color={brand} />
            <FontAwesome5 style={styles.cogWheel} name="cog" size={20} color={brand} />
          </TouchableOpacity>
        </View>
        <MenuCards />
        <StyledButton onPress={clearLogin}>
          <ButtonText>Log ud</ButtonText>
        </StyledButton>
      </DefaultContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cogWheel: {
    position: 'absolute',
    top: 22,
    left: -5,
    color: brand,
  },
  PageTitle: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '400',
    color: darkLight,
  },
  SubTitle: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '400',
    color: brand,
  },
  'SubTitle.email': {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '400',
    color: darkLight,
  },
  Avatar: {
    color: darkLight,
  },
});

export default Welcome;
