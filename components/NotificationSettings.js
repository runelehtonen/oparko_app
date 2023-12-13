import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { Colors } from './../components/styles';
import Slider from '@react-native-community/slider';

// Colors
const { primary, brand, tertiary } = Colors;

const NotificationSettings = () => {
  const [receiveSMS, setReceiveSMS] = useState(false);
  const [receiveNotifications, setReceiveNotifications] = useState(false);

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Aktiv Parkering</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardContentText}>
            Modtag løbende notifikationer eller beskeder så længe parkering er aktiv
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#025578"
              maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            />
            <View style={styles.textContainer}>
              <Text style={{ textAlign: 'right', color: '#000000' }}>60 min</Text>
            </View>
          </View>
          <View style={styles.extraView}>
            <Text style={{ marginLeft: 10, flex: 1 }}>Modtag SMS</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={receiveSMS}
              onValueChange={() => setReceiveSMS(!receiveSMS)}
            />
          </View>
          <View style={styles.extraView}>
            <Text style={{ marginLeft: 10, flex: 1 }}>Push notifikationer</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={receiveNotifications}
              onValueChange={() => setReceiveNotifications(!receiveNotifications)}
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
            Modtag notifikationer eller beskeder når din parkering snart udløber
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#025578"
              maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            />
            <View style={styles.textContainer}>
              <Text style={{ textAlign: 'right', color: '#000000' }}>35 min</Text>
            </View>
          </View>
          <View style={styles.extraView}>
            <Text style={{ marginLeft: 10, flex: 1 }}>Modtag SMS</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={receiveSMS}
              onValueChange={() => setReceiveSMS(!receiveSMS)}
            />
          </View>
          <View style={styles.extraView}>
            <Text style={{ marginLeft: 10, flex: 1 }}>Push notifikationer</Text>
            <Switch
              thumbColor={Colors.primary}
              trackColor={{ false: '#767577', true: '#025578' }}
              value={receiveNotifications}
              onValueChange={() => setReceiveNotifications(!receiveNotifications)}
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
    paddingVertical: 10,
  },
});
