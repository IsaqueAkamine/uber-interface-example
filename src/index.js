import React from 'react';
import { View, Text } from 'react-native';
import Map from './components/Map';

export default function Index() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Map />
        </View>
    );
}
