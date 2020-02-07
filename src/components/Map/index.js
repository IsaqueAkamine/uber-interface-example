import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import MapView from 'react-native-maps';

export default function Map() {
    const [region, setRegion] = useState({});

    useEffect(() => {
        async function getLocation() {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    })
                }, //success
                () => { }, //error
                {
                    timeout: 2000,
                    enableHighAccuracy: true,
                    maximumAge: 1000,
                }
            );
        }
        getLocation()
    }, [])

    return (
        <View style={styles.container}>
            {/* <Text>TESTE</Text> */}
            <MapView
                style={{ flex: 1, width: '100%' }}
                // San Francisco Location
                // initialRegion={{ 
                //     latitude: 37.78825,
                //     longitude: -122.4324,
                //     latitudeDelta: 0.0922,
                //     longitudeDelta: 0.0421,
                // }}
                showsUserLocation
                loadingEnabled
                region={region}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})