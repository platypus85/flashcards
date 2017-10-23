import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { primaryColor, primaryBackgroundColor } from '../../themes/default/colors';

export default function PrimaryBtn ({ title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={onPress}>
        <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  primaryButton: {
    padding: 15,
    backgroundColor: primaryBackgroundColor,
    borderRadius: 0,
    width: 175,
    alignItems: 'center'
  },
  primaryButtonText: {
    color: primaryColor
  }
})
