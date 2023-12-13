import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import {
  Colors,
  StyledFormArea,
  StyledButton,
  ButtonText,
  ExtraText,
  MsgBox,
  ModalContainer,
  ModalContent,
  LeftIconContainer,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
} from './../components/styles';

const { brand, darkLight, primary } = Colors;

const AccountSettings = () => {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { userId, token } = storedCredentials;

  const [userInfo, setUserInfo] = useState({});

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(userInfo.dateOfBirth ? new Date(userInfo.dateOfBirth) : null);
  const [dob, setDob] = useState(userInfo.dateOfBirth ? new Date(userInfo.dateOfBirth) : null);

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

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
            console.log('User Information:', result.data);

            // Parse the date of birth into a Date object
            const dobDate = result.data.dateOfBirth ? new Date(result.data.dateOfBirth) : new Date(2000, 0, 1);

            setUserInfo({
              ...result.data,
              dateOfBirth: dobDate,
            });

            // Set the initial values for the date pickers
            setDate(dobDate);
            setDob(dobDate);

            console.log('Updated UserInfo:', userInfo);
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

  useEffect(() => {
    console.log('Updated UserInfo:', userInfo);
  }, [userInfo]);

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log('Selected Date:', currentDate); // Add this line
    setDate(currentDate);
    setDob(currentDate);
    console.log('Updated Date:', currentDate); // Add this line
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const clearLogin = async () => {
    try {
      await AsyncStorage.removeItem('oparkoAppToken');
      await AsyncStorage.removeItem('oparkoAppUser');
      // Add any other items you want to remove

      setStoredCredentials(null); // Clear stored credentials in the state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>Indstillinger</Text>
        <Text style={styles.changePasswordLink}>Skift adgangskode</Text>
      </View>
      <Formik
        key={JSON.stringify(userInfo)}
        initialValues={{
          name: userInfo.name || '',
          email: userInfo.email || '',
          dateOfBirth: userInfo.dateOfBirth || '',
          address: userInfo.address || '',
          zipCode: userInfo.zipCode || '',
          city: userInfo.city || '',
          phone: userInfo.phone || '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          values = { ...values, dateOfBirth: dob };
          if (values.email == '' || values.name == '' || values.dateOfBirth == '' || values.confirmPassword == '') {
            handleMessage('Udfyld venligst alle felter');
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
              label="Adresse"
              icon="location"
              placeholder="1234 Gadevej"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />

            <MyTextInput
              label="Postnummer"
              icon="location"
              placeholder="8000"
              onChangeText={handleChange('zipCode')}
              onBlur={handleBlur('zipCode')}
              value={values.zipCode}
            />

            <MyTextInput
              label="By"
              icon="location"
              placeholder="Aarhus"
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
            />

            <MyTextInput
              label="Telefonnummer"
              icon="device-mobile"
              placeholder="+45 12 34 56 78"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />

            <View style={styles.titleContainer}>
              <Text style={styles.subTitle}>Tilknyttede køretøjer</Text>
            </View>

            <MyTextInput
              label="Registreringsnummer"
              icon="link"
              placeholder="XX XX XX"
              onChangeText={handleChange('regNu')}
              onBlur={handleBlur('regNu')}
              value={values.regNu}
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
            <View style={styles.actions}>
              <TouchableOpacity onPress={clearLogin}>
                <View style={styles.extraView}>
                  <ExtraText>Log ud </ExtraText>
                  <Ionicons name="ios-arrow-forward" size={20} color={darkLight} />
                </View>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity>
                <View style={styles.extraView}>
                  <ExtraText>Slet bruger </ExtraText>
                  <Ionicons name="ios-arrow-forward" size={20} color={darkLight} />
                </View>
              </TouchableOpacity>
            </View>
          </StyledFormArea>
        )}
      </Formik>
    </>
  );
};
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  console.log('Date Value:', props.value);
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

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  formBackground: {
    width: '100%',
    minHeight: 550,
    backgroundColor: primary,
    padding: 25,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  subTitle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '400',
    color: brand,
  },

  changePasswordLink: {
    color: darkLight,
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 35,
  },
  pen: {
    position: 'absolute',
    color: primary,
  },
  circleWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: -5,
  },

  circleBackground: {
    backgroundColor: brand,
    borderRadius: 999,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Avatar: {
    color: darkLight,
  },
  extraView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: darkLight,
    opacity: 0.3,
    marginVertical: 1,
  },
  actions: {
    padding: 0,
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

export default AccountSettings;
