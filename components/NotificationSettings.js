import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors } from './../components/styles';
import { CredentialsContext } from './../components/CredentialsContext'; // Import the authentication context

// Colors
const { primary, brand, tertiary, darkLight } = Colors;

const NotificationSettings = () => {
  const { storedCredentials } = useContext(CredentialsContext);
  const { userId, token } = storedCredentials;

  const [updateTrigger, setUpdateTrigger] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    receiveSMSActive: false,
    receiveNotificationsActive: false,
    receiveSMSExpiring: false,
    receiveNotificationsExpiring: false,
    receiveEmailReceipts: false,
    receiveNotificationsMarketing: false,
    activeParkingHours: 15,
    expiringSoonHours: 15,
  });

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        if (userId && token) {
          const response = await fetch(`http://192.168.0.64:3000/user/notification-settings/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `${token}`,
            },
          });

          const data = await response.json();

          if (data.status === 'SUCCESS') {
            setNotificationSettings(data.data.notificationSettings || {});
          } else {
            console.error('Failed to fetch notification settings:', data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching notification settings:', error);
      }
    };

    fetchNotificationSettings();
  }, [userId, token]);

  useEffect(() => {
    // Call the update function whenever notificationSettings change
    updateNotificationSettings();
  }, [notificationSettings]);

  const updateNotificationSettings = async () => {
    try {
      const response = await fetch(`http://192.168.0.64:3000/user/update-notification-settings/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ notificationSettings }),
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        console.log('Notification settings updated successfully:', data.data);
      } else {
        console.error('Failed to update notification settings:', data.message);
      }
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  const handleActiveParkingChange = (value) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      activeParkingHours: Math.round(value) + 15,
    }));
    // Trigger an update
    setUpdateTrigger((prev) => !prev);
  };

  const handleExpiringSoonChange = (value) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      expiringSoonHours: Math.round(value) + 15,
    }));
    // Trigger an update
    setUpdateTrigger((prev) => !prev);
  };

  const handleSwitchToggle = (settingName) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [settingName]: !prevSettings[settingName],
    }));
    // Trigger an update
    setUpdateTrigger((prev) => !prev);
  };

  const formatTime = (minutes) => {
    return `${minutes} min`;
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Aktiv Parkering</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardContentText}>
            Modtag løbende påmindelser om din igangværende parkering på et selvvalgt tidsinterval.
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {notificationSettings.receiveSMSActive || notificationSettings.receiveNotificationsActive ? (
              <>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={225}
                  minimumTrackTintColor="#025578"
                  maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
                  step={15}
                  value={notificationSettings.activeParkingHours - 15}
                  onValueChange={handleActiveParkingChange}
                />
                <View style={styles.textContainer}>
                  <Text style={{ textAlign: 'right', color: '#000000' }}>
                    {formatTime(notificationSettings.activeParkingHours)}
                  </Text>
                </View>
              </>
            ) : null}
          </View>
          <View style={styles.extraView}>
            <Text style={styles.extraViewText}>Modtag SMS</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={notificationSettings.receiveSMSActive}
              onValueChange={() => handleSwitchToggle('receiveSMSActive')}
            />
          </View>
          <View style={styles.extraView}>
            <Text style={styles.extraViewText}>Push notifikationer</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={notificationSettings.receiveNotificationsActive}
              onValueChange={() => handleSwitchToggle('receiveNotificationsActive')}
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Udløber snart</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardContentText}>
            Undgå parkeringsafgifter fordi du ikke var tilbage i tide. Modtag en påmindelse i forvejen for udløb af din
            parkering.
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {notificationSettings.receiveSMSExpiring || notificationSettings.receiveNotificationsExpiring ? (
              <>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={225}
                  minimumTrackTintColor="#025578"
                  maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
                  step={15}
                  value={notificationSettings.expiringSoonHours - 15}
                  onValueChange={handleExpiringSoonChange}
                />
                <View style={styles.textContainer}>
                  <Text style={{ textAlign: 'right', color: '#000000' }}>
                    {formatTime(notificationSettings.expiringSoonHours)}
                  </Text>
                </View>
              </>
            ) : null}
          </View>
          <View style={styles.extraView}>
            <Text style={styles.extraViewText}>Modtag SMS</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={notificationSettings.receiveSMSExpiring}
              onValueChange={() => handleSwitchToggle('receiveSMSExpiring')}
            />
          </View>
          <View style={styles.extraView}>
            <Text style={styles.extraViewText}>Push notifikationer</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={notificationSettings.receiveNotificationsExpiring}
              onValueChange={() => handleSwitchToggle('receiveNotificationsExpiring')}
            />
          </View>
        </View>
      </View>

      {/* New Card for "Kvitteringer" */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Kvitteringer</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardContentText}>
            Modtag kvitteringer på email, når du køber en parkeringstilladelse.
          </Text>
          <View style={styles.extraView}>
            <Text style={styles.extraViewText}>Email</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={notificationSettings.receiveEmailReceipts}
              onValueChange={() => handleSwitchToggle('receiveEmailReceipts')}
            />
          </View>
        </View>
      </View>

      {/* Marketingkommunikation */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Marketingkommunikation</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardContentText}>
            Vil du være den første til at få besked om ændringer, nye services, tids- og pengesparende tips, eller bare
            modtage specielle tilbud?{' '}
          </Text>
          <View style={styles.extraView}>
            <Text style={styles.extraViewText}>Email, SMS, Push notifikationer</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={notificationSettings.receiveNotificationsMarketing}
              onValueChange={() => handleSwitchToggle('receiveNotificationsMarketing')}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({
  card: {
    backgroundColor: primary,
    borderRadius: 20,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 10,
  },

  cardHeaderText: {
    fontSize: 18,
    fontWeight: '400',
    color: brand,
  },

  cardContent: {
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  slider: {
    flex: 1,
    marginTop: 10,
  },

  textContainer: {
    marginTop: 10,
    padding: 5,
  },

  cardContentText: {
    fontSize: 13,
    color: tertiary,
  },

  extraView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  extraViewText: {
    fontSize: 13,
    color: darkLight,
  },
});
