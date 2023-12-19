import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  LeftIconContainer,
  FormBackground,
  CarImg,
} from './../components/styles';
import { View, ActivityIndicator } from 'react-native';

// Colors
const { lightGray, darkLight, primary } = Colors;

// Keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// API client
import axios from 'axios';

import * as Google from 'expo-google-app-auth';

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    setLoading(true);

    const url = 'https://login-server-9jcr.onrender.com/user/signin';

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          const { token, user } = data;

          console.log('User Data:', data); // Log the entire user data

          AsyncStorage.setItem('oparkoAppToken', token);
          AsyncStorage.setItem('oparkoAppUser', JSON.stringify(user));

          setStoredCredentials({ token, userId: user.userId }); // Set userId in credentials
          navigation.navigate('Welcome');
        }

        setSubmitting(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        setLoading(false);
        handleMessage('An error occurred. Check your network and try again');
      });
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientId: `650574046243-b719pb37733uc3d14pvc11ebplkk77ki.apps.googleusercontent.com`,
      androidClientId: `650574046243-4s9a5tmcmkbrt1s00fakvvk31uju55oe.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          persistLogin({ email, name, photoUrl }, message, 'SUCCESS');
        } else {
          handleMessage('Google signin was cancelled');
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        handleMessage('An error occurred. Check your network and try again');
        setGoogleSubmitting(false);
      });
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('oparkoAppCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
        handleMessage('Persisting login failed');
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/Oparko_Logo_Pos.png')} />
          <CarImg resizeMode="cover" source={require('./../assets/img/car.png')} />
          <FormBackground>
            <PageTitle>Log ind</PageTitle>
            {/* <SubTitle>Subtitle</SubTitle> */}

            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values, { setSubmitting }) => {
                if (values.email == '' || values.password == '') {
                  handleMessage('Udfyld venligst alle felter');
                  setSubmitting(false);
                } else {
                  handleLogin(values, setSubmitting);
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                <StyledFormArea>
                  <MyTextInput
                    label="Email adresse"
                    icon="mail"
                    placeholder="eksempel@email.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />

                  <MyTextInput
                    label="Adgangskode"
                    icon="lock"
                    placeholder="********"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />

                  <MsgBox type={messageType}>{message}</MsgBox>
                  {!isSubmitting && (
                    <StyledButton onPress={handleSubmit} disabled={loading}>
                      <ButtonText>Log ind</ButtonText>
                    </StyledButton>
                  )}

                  {isSubmitting && (
                    <StyledButton disabled={true}>
                      <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                  )}

                  <Line />

                  {!googleSubmitting && (
                    <StyledButton google={true} disabled={true} onPress={handleGoogleSignin}>
                      <Fontisto name="google" color={primary} size={25} />
                      <ButtonText google={true}>Log ind med Google</ButtonText>
                    </StyledButton>
                  )}

                  {googleSubmitting && (
                    <StyledButton disabled={true} google={true}>
                      <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                  )}
                  <ExtraView>
                    <ExtraText>Ikke oprettet endnu? </ExtraText>
                    <TextLink onPress={() => navigation.navigate('Signup')}>
                      <TextLinkContent>Opret bruger</TextLinkContent>
                    </TextLink>
                  </ExtraView>
                </StyledFormArea>
              )}
            </Formik>
          </FormBackground>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIconContainer>
        <LeftIcon>
          <Octicons name={icon} size={24} color={lightGray} />
        </LeftIcon>
      </LeftIconContainer>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={lightGray} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
