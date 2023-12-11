import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import { StyledButton, ButtonText, Colors, MsgBox, DefaultContainer } from './../components/styles';

// Colors
const { brand, primary, red, bg } = Colors;

const Start = () => {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToSignup = () => {
    navigation.navigate('Signup');
  };
  return (
    <>
      <StatusBar style="dark" />
      <DefaultContainer>
        <View style={styles.logoContainer}>
          <Image style={styles.logoImg} resizeMode="contain" source={require('./../assets/img/Oparko_Logo_Pos.png')} />
        </View>

        <View style={styles.parkingLotContainer}>
          <Image
            style={styles.parkingLotImg}
            resizeMode="contain"
            source={require('./../assets/img/Parking_Lot.png')}
          />
        </View>
        {/* <View style={styles.notificationMessageContainer}>
          <Text style={styles.notificationMessage}>Vi oplever i øjeblikket problemer med Login</Text>
        </View> */}
      </DefaultContainer>
      <View style={styles.buttonContainer}>
        <StyledButton onPress={goToLogin}>
          <ButtonText>Log ind</ButtonText>
        </StyledButton>

        <StyledButton style={styles.opretBrugerButton} onPress={goToSignup}>
          <ButtonText style={styles.opretBrugerButtonText}>Opret bruger</ButtonText>
        </StyledButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    flex: 1,
    maxWidth: '90%',
    justifyContent: 'center',
  },
  parkingLotContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parkingLotImg: {
    flex: 1,
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationMessageContainer: {
    position: 'absolute',
    bottom: 180,
    left: 28,
    right: 28,
    flex: 0.1,
    backgroundColor: red,
    borderRadius: 4,
    padding: 10,
  },
  notificationMessage: {
    textAlign: 'center',
    fontSize: 13,
    color: primary,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: primary,
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  opretBrugerButton: {
    backgroundColor: bg,
    marginTop: 10,
  },
  opretBrugerButtonText: {
    color: brand,
  },
});

export default Start;
