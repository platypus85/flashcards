import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { highlightColor, highlightBackgroundColor } from '../../themes/default/colors';

export default function SubmitBtn ({ title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitButton}
      onPress={onPress}>
        <Text style={styles.submitButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    padding: 15,
    backgroundColor: highlightBackgroundColor,
    borderRadius: 0,
    width: 175,
    alignItems: 'center'
  },
  submitButtonText: {
    color: highlightColor
  }
})
