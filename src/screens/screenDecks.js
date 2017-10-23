import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MyDeck from '../components/deck/myDeck';
import * as ScreenStyles from '../themes/default/screens';
import sortBy from 'sort-by';
import * as CardToDeck from '../utils/cardToDeck.js';

class ScreenDecks extends Component {
  render() {
    let { decks, cards } = this.props;
    if (decks && decks.length > 0) {
      decks.sort(sortBy('-timestamp'));
      decks = decks.map((deck, key) => {
        deck.key = key;
        deck.num = key+1;
        deck.cards = cards ? cards.filter(card => CardToDeck.doesCardBelongToDeck(card, deck)) : [];
        return deck;
      });
    }

    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {decks.length > 0
              ? 'Choose a deck:'
              : 'Add a new deck'
            }
          </Text>
        </View>
        <View style={styles.decks}>
          <FlatList
            data={decks}
            renderItem={({ item }) => <TouchableOpacity
              style={styles.deck}
              onPress={() => this.props.navigation.navigate(
              'ViewDeck',
              { id: item.id }
            )}>
                <MyDeck {...item} />
              </TouchableOpacity>}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps ({ decks, cards }) {
  return {
    decks,
    cards
  }
}

export default connect(
  mapStateToProps
)(ScreenDecks)

const styles = StyleSheet.create({
  screen: {
    ...ScreenStyles.styles.screen
  },
  header: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 20
  },
  decks: {
    flex: 1
  },
  deck: {
    flex: 1,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  }
})
