import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { deckBackgroundColor, deckColor, highlightBackgroundColor, highlightColor } from '../../themes/default/colors';
import * as CardToDeck from '../../utils/cardToDeck';

export default class MyDeck extends Component {
  static propTypes = {
    num: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.number}>
          <Text style={styles.numberText}>#{this.props.num}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyTitle}>{this.props.title}</Text>
          <Text style={styles.bodyNumberOfCards}>{CardToDeck.showNumberOfCards(this.props.cards.length)}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: deckBackgroundColor,
    alignItems: 'stretch',
    borderRadius: 15,
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
  bodyTitle: {
    color: deckColor,
    fontSize: 20
  },
  bodyNumberOfCards: {
    color: deckColor
  }
})
