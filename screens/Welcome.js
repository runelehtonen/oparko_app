import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from './../components/styles';

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

// Colors
const { brand, darkLight, primary } = Colors;

const Welcome = () => {
  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl } = storedCredentials;
  const AvatarImg = photoUrl ? { uri: photoUrl } : require('./../assets/img/avatar.png');

  const clearLogin = () => {
    AsyncStorage.removeItem('oparkoAppCredentials')
      .then(() => {
        setStoredCredentials('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/img/Parking_Lot.png')} />
        <WelcomeContainer>
          <PageTitle welcome={true}>Velkommen</PageTitle>
          <SubTitle welcome={true}>{name || 'What?!'}</SubTitle>
          <SubTitle welcome={true}>{email || 'howDidUGetHere'}</SubTitle>
          <StyledFormArea>
            <Avatar resizeMode="cover" source={AvatarImg} />
            <MsgBox>...</MsgBox>
            <Line />
            <StyledButton onPress={clearLogin}>
              <ButtonText>Log ud</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
