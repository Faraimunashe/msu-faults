import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';

export default function FaultMapPage({ route, navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const coordinates = route.params.data;
  const disaster = route.params.disaster;
  console.log(disaster);
  const lat = parseFloat(coordinates.lat);
  const lon = parseFloat(coordinates.lon);
  //console.log(coordinates.lat, lat);

  // Circle radius in meters
  const circleRadius = 2000;
  const onDonatePress = () => {
    navigation.navigate('Donate', {data: disaster.id});
  };
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //onPress={handleMapPress}
        initialRegion={{
          latitude: lat, // Initial map region latitude
          longitude: lon, // Initial map region longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{"latitude": lat, "longitude": lon}} />
        <Circle
          center={{"latitude": lat, "longitude": lon}}
          radius={circleRadius}
          strokeColor="rgb(210, 0, 0)"
          fillColor="rgba(0, 0, 255, 0.1)"
        />
      </MapView>
      
        <View style={styles.locationContainer}>
          <Text style={styles.title}>
            {disaster.title}
          </Text>
          <Text style={styles.locationText}>
            {disaster.description}
          </Text>
          <Text style={styles.footer}>
            {disaster.name} {disaster.created_at}
          </Text>
          <TouchableOpacity style={styles.button} onPress={onDonatePress}>
            <Text style={styles.buttonText}>Donate Using Ecocash</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10
  },
  locationText: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  footer: {
    fontSize: 8,
    fontWeight: 'normal',
    color: '#616469'
  },
  button: {
    backgroundColor: "#4c5563",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    alignItems: "center"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8
  },
});

