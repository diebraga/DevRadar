import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";

function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
      
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: 52.6571699, longitude: -8.6216564 }}>
              <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/52054459?s=460&v=4' }} />
            </Marker>
          </MapView>
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  }
})

export default Main;