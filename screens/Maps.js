import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MyMaps = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>MyMaps</Text>
      <MapView style={{height: '50%', width: '100%'}} 
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MyMaps;
