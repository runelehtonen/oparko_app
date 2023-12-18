import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  ModalContainer,
  ModalContent,
  LeftIconContainer,
  MsgBox,
  FormBackground,
} from './../components/styles';
import { View, TouchableOpacity, Modal, Text, ActivityIndicator } from 'react-native';

// Colors
const { brand, darkLight, primary, lightGray } = Colors;

// Datepicker
import DateTimePicker from '@react-native-community/datetimepicker';

// Keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// API client
import axios from 'axios';

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [loading, setLoading] = useState(false);

  // Message
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // Actual date of birth to be sent
  const [dob, setDob] = useState();

  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  // handle signup
  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    setLoading(true);

    const url = 'https://login-server-9jcr.onrender.com/user/signup';

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          // Update here to handle the token and user details
          const { token, user } = data;

          console.log('User Data:', data);

          // Store the token and user details in AsyncStorage
          AsyncStorage.setItem('oparkoAppToken', token);
          AsyncStorage.setItem('oparkoAppUser', JSON.stringify(user));

          // Update storedCredentials to include user information
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
          {/* <PageLogo resizeMode="cover" source={require('./../assets/img/Oparko_Logo_Pos.png')} /> */}
          <FormBackground>
            <PageTitle>Opret bruger</PageTitle>

            <Formik
              initialValues={{ name: '', email: '', dateOfBirth: '', password: '', confirmPassword: '' }}
              onSubmit={(values, { setSubmitting }) => {
                values = { ...values, dateOfBirth: dob };
                if (
                  values.email == '' ||
                  values.password == '' ||
                  values.name == '' ||
                  values.dateOfBirth == '' ||
                  values.confirmPassword == ''
                ) {
                  handleMessage('Udfyld venligst alle felter');
                  setSubmitting(false);
                } else if (values.password !== values.confirmPassword) {
                  handleMessage('Adgangskoderne matcher ikke');
                  setSubmitting(false);
                } else {
                  handleSignup(values, setSubmitting);
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                <StyledFormArea>
                  <MyTextInput
                    label="Fulde navn"
                    icon="person"
                    placeholder="Justin Case"
                    placeholderTextColor={lightGray}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />

                  <MyTextInput
                    label="Email adresse"
                    icon="mail"
                    placeholder="eksempel@email.com"
                    placeholderTextColor={lightGray}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />

                  <MyTextInput
                    label="Fødselsdag"
                    icon="calendar"
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor={lightGray}
                    onChangeText={handleChange('dateOfBirth')}
                    onBlur={handleBlur('dateOfBirth')}
                    value={dob ? dob.toDateString() : ''}
                    isDate={true}
                    editable={false}
                    onPressIn={showDatePicker}
                  />

                  <Modal transparent={true} animationType="slide" visible={show} onRequestClose={() => setShow(false)}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPressOut={() => setShow(false)}
                      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                      <ModalContainer>
                        <ModalContent>
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="inline"
                            onChange={onChange}
                          />
                          <TouchableOpacity onPress={() => setShow(false)}>
                            <Text style={{ textAlign: 'center', marginBottom: 12, color: 'blue' }}>Close</Text>
                          </TouchableOpacity>
                        </ModalContent>
                      </ModalContainer>
                    </TouchableOpacity>
                  </Modal>

                  <MyTextInput
                    label="Adgangskode"
                    icon="lock"
                    placeholder="********"
                    placeholderTextColor={lightGray}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />

                  <MyTextInput
                    label="Bekræft adgangskode"
                    icon="lock"
                    placeholder="********"
                    placeholderTextColor={lightGray}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />

                  <MsgBox type={messageType}>{message}</MsgBox>

                  {!isSubmitting && (
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Opret bruger</ButtonText>
                    </StyledButton>
                  )}

                  {isSubmitting && (
                    <StyledButton disabled={true}>
                      <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                  )}
                  <Line />
                  <ExtraView>
                    <ExtraText>Har du allerede en bruger? </ExtraText>
                    <TextLink onPress={() => navigation.navigate('Login')}>
                      <TextLinkContent>Log ind</TextLinkContent>
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIconContainer>
        <LeftIcon>
          <Octicons name={icon} size={24} color={lightGray} />
        </LeftIcon>
      </LeftIconContainer>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={lightGray} />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
