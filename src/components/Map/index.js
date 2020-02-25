import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Search from '../Search';
import Directions from '../Directions';

import { getPixelSize } from '../../utils';
import markerImage from '../../assets/marker.png';

export default function Map() {
    const [region, setRegion] = useState(null);
    const [destination, setDestination] = useState(null);
    const [mapView, setMapView] = useState();

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
                ref={el => setMapView(el)}
            // ref={el => this.mapView = el}
            >
                {destination &&
                    (
                        <Fragment>
                            <Directions
                                origin={region}
                                destination={destination}
                                onReady={result => {
                                    //this.mapView.fitToCoordinates(result.coordinates)
                                    mapView.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: getPixelSize(50),
                                            left: getPixelSize(50),
                                            top: getPixelSize(50),
                                            bottom: getPixelSize(50)
                                        }
                                    });
                                }}
                            />
                            <Marker
                                coordinate={destination}
                                anchor={{ x: 0, y: 0 }}
                                image={markerImage}>
                                <View style={{
                                    backgroundColor: "#FFF",
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.1,
                                    elevation: 1,
                                    border: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 3,
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{
                                        marginVertical: 8,
                                        marginHorizontal: 10,
                                        fontSize: 14,
                                        color: "#333",
                                    }}>
                                        {destination.title}
                                    </Text>
                                </View>
                            </Marker>
                        </Fragment>
                    )}
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