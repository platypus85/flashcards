import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { cardBackgroundColor, cardColor, highlightBackgroundColor, highlightColor } from '../../themes/default/colors';

export default class MyCard extends Component {
  static propTypes = {
    num: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.number}>
          <Text style={styles.numberText}>#{this.props.num}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>{this.props.title}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: cardBackgroundColor,
    alignItems: 'stretch',
    borderRadius: 0,
  },
  number: {
    flex: 1,
    padding: 5,
    position: 'absolute',
    left: 10,
    top: 10,
    alignItems: 'flex-start',
    backgroundColor: highlightBackgroundColor,
    borderRadius: 25
  },
  numberText: {
    color: highlightColor
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    color: cardColor
  }
})
