import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Index from './src/index';

export default function App() {
  return (
    <View style={styles.container}>
      <Index />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#af0',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
