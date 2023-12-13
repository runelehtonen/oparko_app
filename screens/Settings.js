import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Octicons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {
  Colors,
  StyledContainer,
  LeftIconContainer,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  LeftIcon,
} from './../components/styles';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
import PreferenceSettings from '../components/PreferenceSettings';
import NotificationSettings from '../components/NotificationSettings';
import AccountSettings from '../components/AccountSettings';

const { brand, darkLight, primary } = Colors;

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.avatarContainer}>
            <Octicons style={styles.Avatar} name="feed-person" size={85} color={brand} />
            <View style={styles.circleWrapper}>
              <View style={styles.circleBackground}>
                <FontAwesome5 style={styles.pen} name="pen" size={16} color={brand} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 0 && styles.activeTab]}
              onPress={() => {
                setActiveTab(0);
              }}
            >
              <Text style={[styles.tabText, activeTab === 0 && styles.activeTabText]}>Konto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 1 && styles.activeTab]}
              onPress={() => {
                setActiveTab(1);
              }}
            >
              <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>Notifikationer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 2 && styles.activeTab]}
              onPress={() => {
                setActiveTab(2);
              }}
            >
              <Text style={[styles.tabText, activeTab === 2 && styles.activeTabText]}>Præferencer</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formBackground}>
            {activeTab === 0 && <AccountSettings />}
            {activeTab === 1 && <NotificationSettings />}
            {activeTab === 2 && <PreferenceSettings />}
          </View>
        </View>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
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

export default Settings;
