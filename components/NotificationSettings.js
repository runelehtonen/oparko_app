import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors } from './../components/styles';

// Colors
const { primary, brand, tertiary, darkLight } = Colors;

const NotificationSettings = () => {
  const [receiveSMSActive, setReceiveSMSActive] = useState(false);
  const [receiveNotificationsActive, setReceiveNotificationsActive] = useState(false);

  const [receiveSMSExpiring, setReceiveSMSExpiring] = useState(false);
  const [receiveNotificationsExpiring, setReceiveNotificationsExpiring] = useState(false);

  const [receiveEmailReceipts, setReceiveEmailReceipts] = useState(false);

  const [receiveNotificationsMarketing, setReceiveNotificationsMarketing] = useState(false);

  const [activeParkingHours, setActiveParkingHours] = useState(15);
  const [expiringSoonHours, setExpiringSoonHours] = useState(15);

  const handleActiveParkingChange = (value) => {
    setActiveParkingHours(Math.round(value) + 15);
  };

  const handleExpiringSoonChange = (value) => {
    setExpiringSoonHours(Math.round(value) + 15);
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
            {receiveSMSActive || receiveNotificationsActive ? (
              <>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={225}
                  minimumTrackTintColor="#025578"
                  maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
                  step={15}
                  onValueChange={handleActiveParkingChange}
                />
                <View style={styles.textContainer}>
                  <Text style={{ textAlign: 'right', color: '#000000' }}>{formatTime(activeParkingHours)}</Text>
                </View>
              </>
            ) : null}
          </View>
          <View style={styles.extraView}>
            <Text style={styles.extraViewText}>Modtag SMS</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={receiveSMSActive}
              onValueChange={() => setReceiveSMSActive(!receiveSMSActive)}
            />
          </View>
          <View style={styles.extraView}>
            <Text style={styles.extraViewText}>Push notifikationer</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={receiveNotificationsActive}
              onValueChange={() => setReceiveNotificationsActive(!receiveNotificationsActive)}
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
            {receiveSMSExpiring || receiveNotificationsExpiring ? (
              <>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={225}
                  minimumTrackTintColor="#025578"
                  maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
                  step={15}
                  onValueChange={handleExpiringSoonChange}
                />
                <View style={styles.textContainer}>
                  <Text style={{ textAlign: 'right', color: '#000000' }}>{formatTime(expiringSoonHours)}</Text>
                </View>
              </>
            ) : null}
          </View>
          <View style={styles.extraView}>
            <Text style={styles.extraViewText}>Modtag SMS</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={receiveSMSExpiring}
              onValueChange={() => setReceiveSMSExpiring(!receiveSMSExpiring)}
            />
          </View>
          <View style={styles.extraView}>
            <Text style={styles.extraViewText}>Push notifikationer</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={receiveNotificationsExpiring}
              onValueChange={() => setReceiveNotificationsExpiring(!receiveNotificationsExpiring)}
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
              value={receiveEmailReceipts}
              onValueChange={() => setReceiveEmailReceipts(!receiveEmailReceipts)}
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
              value={receiveNotificationsMarketing}
              onValueChange={() => setReceiveNotificationsMarketing(!receiveNotificationsMarketing)}
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
