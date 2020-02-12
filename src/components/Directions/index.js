import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

export default Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyCXdjR7roRRqPhmDoQx5k3BrqmABIPpeJ4"
        strokeWidth={3}
        strokeColor="#222"
    />
);
