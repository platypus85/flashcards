import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Popup from 'react-native-popup';
import * as ScreenStyles from '../themes/default/screens';
import * as CardToDeck from '../utils/cardToDeck.js';
import PrimaryButton from '../components/buttons/primaryButton';
import SubmitButton from '../components/buttons/submitButton';
import { setActiveDeck } from '../components/deck/activeDeckActions';

class ViewDeck extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.setActiveDeck(this.props.navigation.state.params.id);
  }
  setActiveDeck = (id) => {
    const { decks, cards } = this.props;
    let activeDeck = null;
    if (decks) {
      activeDeck = decks.filter(deck => deck.id === id)[0];
      if (activeDeck) {
        activeDeck.cards = cards ? cards.filter(card => CardToDeck.doesCardBelongToDeck(card, activeDeck)) : [];
        this.props.setActiveDeck(activeDeck);
      }
    }
  }
  pressAddCard = () => {
    this.props.navigation.navigate(
      'AddCard'
    );
  }
  pressStartAQuiz = () => {
    const { activeDeck } = this.props;
    if (activeDeck.cards.length === 0) {
      Keyboard.dismiss();
      this.popup.alert('Please add at least one card.');
      return;
    }
    this.props.navigation.navigate(
      'StartQuiz'
    );
  }
  render() {
    const { id } = this.props.navigation.state.params;
    const { activeDeck } = this.props;
    if (!activeDeck) {
      return (
        <View style={styles.screen}>
          <Text>Loading... please wait.</Text>
        </View>
      )
    }
    const numberOfCards = activeDeck.cards ? CardToDeck.showNumberOfCards(activeDeck.cards.length) : 0;

    return (
      <View style={styles.screen}>
        <View style={styles.wrap}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{activeDeck.title}</Text>
            <Text style={styles.headerNumberOfCards}>{ numberOfCards }</Text>
          </View>
          <View style={styles.buttons}>
            <SubmitButton
              title="Add New Card"
              onPress={this.pressAddCard}
            />
            <PrimaryButton
              title="Start a Quiz"
              onPress={this.pressStartAQuiz}
            />
          </View>
        </View>
        <Popup ref={popup => this.popup = popup }/>
      </View>
    )
  }
}

function mapStateToProps ({ decks, activeDeck, cards }) {
  return {
    decks,
    activeDeck,
    cards
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setActiveDeck: (deck) => dispatch(setActiveDeck(deck))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewDeck)

const styles = StyleSheet.create({
  screen: {
    ...ScreenStyles.styles.screen,
    justifyContent: 'flex-start'
  },
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  headerTitle: {
    fontSize: 25
  },
  headerNumberOfCards: {
    fontSize: 15
  },
  buttons: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 50
  }
})
