import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from 'react-native-maps';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const mapDarkStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];

const mapStandardStyle = [
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
];

const MyMaps = () => {

  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  })

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  })


  return (
    <View style={styles.container}>
      <Text style={styles.text}>MyMaps</Text>
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed={"auto"}
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance"
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details)
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          })
        }}
        query={{
          key: "AIzaSyAfevgpvPNjRALaz3jPJhNgE040p9GnH5o",
          language: "en",
          components: "country:us",
          types: "establishment",
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`
        }}
        styles={{
          container: { flex: 0, position: "center", width: "100%", zIndex: 1 },
          listView: { backgroundColor: "black" }
        }}
      />
      <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        customMapStyle={mapDarkStyle}
        region={region}
      >
        <Marker
          coordinate={pin}
          title="My Custom Title"
          description="Custom description"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag Start", e.nativeEvent.coordinate)
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            })
          }}
        >
          <Image
            source={require('../assets/mapmarker.jpg')}
            style={styles.marker}
            resizeMode="stretch"
          />

          {/** Callout puede remplazar la informacion que muestra el marker y acomodar 
           * una foto para que se muestre como Yelp */
            /* <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text style={styles.text}>Favorite Restaurant</Text>
                <Image
                  style={styles.image}
                  source={require('../assets/arkus-logo.png')}
                />
              </View>
            </View>
          </Callout> */}
        </Marker>
        <Circle
          center={pin}
          radius={400}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 5,
    padding: 15,
    width: 150,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  marker: {
    width: 45,
    height: 45,
  },
});

export default MyMaps;
