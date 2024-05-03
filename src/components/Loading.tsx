import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

export default function Loading() {
  return <ActivityIndicator size="large" style={styles.indicator} />;
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
