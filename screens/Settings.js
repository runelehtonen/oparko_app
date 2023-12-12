import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Colors,
  StyledContainer,
  InnerContainer,
  PageTitle,
  FormBackground,
  StyledFormArea,
  LeftIconContainer,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  MsgBox,
  LeftIcon,
  ModalContainer,
  ModalContent,
} from './../components/styles';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from './../components/CredentialsContext';

const Settings = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const [dob, setDob] = useState();
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  const handleUpdate = (values, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.0.64:3000/user/update'; // Update this URL with your backend endpoint for updating user info
    axios
      .put(url, values)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          persistUpdatedInfo(data, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
      });
  };

  const persistUpdatedInfo = (credentials, message, status) => {
    AsyncStorage.setItem('oparkoAppCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
        handleMessage('Persisting updated info failed');
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <FormBackground>
            <PageTitle>Indstillinger</PageTitle>

            <Formik
              initialValues={{
                name: storedCredentials.name,
                email: storedCredentials.email,
                dateOfBirth: '',
                password: '',
                confirmPassword: '',
              }}
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
                  handleUpdate(values, setSubmitting);
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                <StyledFormArea>
                  <MyTextInput
                    label="Fulde navn"
                    icon="person"
                    placeholder="Justin Case"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />

                  <MyTextInput
                    label="Email adresse"
                    icon="mail"
                    placeholder="eksempel@email.com"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />

                  <MyTextInput
                    label="Fødselsdag"
                    icon="calendar"
                    placeholder="MM/DD/YYYY"
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
                      <ButtonText>Opdater indstillinger</ButtonText>
                    </StyledButton>
                  )}

                  {isSubmitting && (
                    <StyledButton disabled={true}>
                      <ActivityIndicator size="large" color={Colors.primary} />
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
          <Octicons name={icon} size={24} color={Colors.lightGray} />
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
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={Colors.lightGray} />
        </RightIcon>
      )}
    </View>
  );
};

export default Settings;
