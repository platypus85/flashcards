import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { dangerColor, dangerBackgroundColor } from '../../themes/default/colors';

export default function DangerBtn ({ title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.dangerButton}
      onPress={onPress}>
        <Text style={styles.dangerButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dangerButton: {
    padding: 15,
    backgroundColor: dangerBackgroundColor,
    borderRadius: 15,
    width: 200,
    alignItems: 'center'
  },
  dangerButtonText: {
    color: dangerColor
  }
})
