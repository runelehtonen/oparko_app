import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import MenuCards from './../components/MenuCards';
import { useNavigation } from '@react-navigation/native';
import CardsStacked from './../components/CardsStacked';

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
  const [avatar, setAvatar] = useState(null);

  const retrieveAvatar = async () => {
    try {
      const storedAvatar = await AsyncStorage.getItem('avatar');
      if (storedAvatar) {
        setAvatar(storedAvatar);
      }
    } catch (error) {
      console.error('Error retrieving avatar from AsyncStorage:', error);
    }
  };

  const goToSettings = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId && token) {
        try {
          const response = await fetch(`https://login-server-9jcr.onrender.com/user/profile/${userId}`, {
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

    // Fetch user information whenever userId, token or userInfo changes
    fetchUserInfo();
    retrieveAvatar();
  }, [userId, token, userInfo]);

  const [activeTab, setActiveTab] = useState(0); // Initial active tab

  const switchTab = (tabName) => {
    setActiveTab(tabName);
    // You can perform additional actions when switching tabs if needed
  };

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
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <Octicons style={styles.Avatar} name="feed-person" size={40} color={brand} />
            )}
            <FontAwesome5 style={styles.cogWheel} name="cog" size={20} color={brand} />
          </TouchableOpacity>
        </View>
        <MenuCards />
      </DefaultContainer>
      <View style={styles.innerContainer}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 0 && styles.activeTab]}
            onPress={() => {
              setActiveTab(0);
            }}
          >
            <Text style={[styles.tabText, activeTab === 0 && styles.activeTabText]}>P-tilladelser</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 1 && styles.activeTab]}
            onPress={() => {
              setActiveTab(1);
            }}
          >
            <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>Historik</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 2 && styles.activeTab]}
            onPress={() => {
              setActiveTab(2);
            }}
          >
            <Text style={[styles.tabText, activeTab === 2 && styles.activeTabText]}>Abonnementer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formBackground}>
          {activeTab === 0 && <CardsStacked />}
          {activeTab === 1 && (
            <View>
              <Text style={{ textAlign: 'center', fontSize: 36 }}>404</Text>
              <Text style={{ textAlign: 'center', color: '#025578', fontSize: 22 }}>Historik</Text>
              <Text style={{ textAlign: 'center' }}>er i øjeblikket under udvikling</Text>
            </View>
          )}
          {activeTab === 2 && (
            <View>
              <Text style={{ textAlign: 'center', fontSize: 36 }}>404</Text>
              <Text style={{ textAlign: 'center', color: '#025578', fontSize: 22 }}>Abonnementer</Text>
              <Text style={{ textAlign: 'center' }}>er i øjeblikket under udvikling</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  formBackground: {
    flex: 1,
    width: '100%',
    backgroundColor: primary,
    padding: 25,
  },
  textContainer: {
    flex: 1,
    marginRight: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 999,
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
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '400',
    color: darkLight,
  },
  Avatar: {
    color: darkLight,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: primary,
    justifyContent: 'space-around',
    width: '100%',
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: brand,
    borderBottomWidth: 3,
  },
  tabText: {
    color: darkLight,
    textAlign: 'center',
  },
  activeTabText: {
    color: brand,
  },
});

export default Welcome;
