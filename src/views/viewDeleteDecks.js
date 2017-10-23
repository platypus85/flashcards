import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Popup from 'react-native-popup';
import * as ScreenStyles from '../themes/default/screens';
import DangerButton from '../components/buttons/dangerButton';
import { default as UUID } from 'uuid';
import { deleteAllDecks } from '../components/deck/deckActions';
import { deleteAllCards } from '../components/card/cardActions';


const styles = StyleSheet.create({
  screen: {
    ...ScreenStyles.styles.screen,
    justifyContent: 'flex-start'
  },
  header: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 20
  },
  newDeck: {
    padding: 15
  },
  newDeckTextInput: {
    fontSize: 15,
    textAlignVertical: 'top'
  },
  deleteButtonWrapper: {
    paddingTop: 20,
    alignItems: 'center'
  }
})


const initialState = {
  title: ""
}

class ViewAddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  deleteAllDecks = () => {
    this.props.deleteAllDecks();
    this.props.deleteAllCards();
    this.setState(initialState);
    this.props.navigation.navigate('Decks');
  }
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Click below to delete ALL decks.</Text>
        </View>
        <View style={styles.deleteButtonWrapper}>
          <DangerButton
            title="DELETE ALL DECKS"
            onPress={this.deleteAllDecks}
          />
        </View>
        <Popup ref={popup => this.popup = popup }/>
      </View>
    )
  }
}

function mapStateToProps ({ decks }) {
  return {
    decks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteAllDecks: () => dispatch(deleteAllDecks()),
    deleteAllCards: () => dispatch(deleteAllCards())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAddDeck)
