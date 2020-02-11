import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

export default Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyDrmvZlcRUa32woYHYHXeNMvkKq82kqqpA"
        strokeWidth={3}
        strokeColor="#222"
    />
);
