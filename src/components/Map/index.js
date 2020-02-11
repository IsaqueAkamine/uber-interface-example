import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import MapView from 'react-native-maps';
import Search from '../Search';
import Directions from '../Directions';

export default function Map() {
    const [region, setRegion] = useState(null);
    const [destination, setDestination] = useState(null);

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

    function handleLocationSelected(data, { geometry }) {
        const { location: { lat: latitude, lng: longitude } } = geometry
        setDestination({
            latitude,
            longitude,
            title: data.strutured_formatting.main_text
        })
    }

    return (
        <View style={styles.container}>
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
            >
                {destination &&
                    (<Directions
                        origin={region}
                        destination={destination}
                        onReady={() => { }}
                    />)}
            </MapView>
            <Search onLocationSelected={handleLocationSelected} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: Platform.OS === 'android' && 25
    },
})