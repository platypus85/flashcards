import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard  } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import * as ScreenStyles from '../themes/default/screens';
import SubmitButton from '../components/buttons/submitButton';
import { default as UUID } from 'uuid';
import { addCard, deleteAllCards } from '../components/card/cardActions';
import Popup from 'react-native-popup';

const initialState = {
  question: "",
  answer: ""
}

class ScreenAddCard extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  addCard = () => {
    const { question, answer } = this.state;
    if (question === '') {
      Keyboard.dismiss();
      this.popup.alert('Please enter a question.');
      return;
    }
    if (answer === '') {
      Keyboard.dismiss();
      this.popup.alert('Please enter an answer.');
      return;
    }
    const id = UUID.v4();
    const timestamp = Date.now();
    const deckId = this.props.activeDeck.id;
    this.props.addCard({ id, question, answer, timestamp, deckId });
    this.setState(initialState);
    this.props.navigation.dispatch(NavigationActions.back());
  }
  deleteAllCards = () => {
    const deckId = this.props.activeDeck.id;
    this.props.deleteAllCards(deckId);
    this.setState(initialState);
    this.props.navigation.dispatch(NavigationActions.back());
  }
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerText}>What is the question?</Text>
        </View>
        <View style={styles.newCard}>
          <TextInput style={styles.newCardTextInput}
            value={this.state.question}
            placeholder="Enter question here"
            onChangeText={(question) => this.setState({ question })}
          ></TextInput>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>What is the answer?</Text>
        </View>
        <View style={styles.newCard}>
          <TextInput style={styles.newCardTextInput}
            value={this.state.answer}
            placeholder="Enter answer here"
            onChangeText={(answer) => this.setState({ answer })}
          ></TextInput>
        </View>
        <View style={styles.submitButtonWrapper}>
          <SubmitButton
            title="SUBMIT"
            onPress={this.addCard}
          />
        </View>
        {/*
        <View style={styles.deleteButtonWrapper}>
          <SubmitButton
            title="DELETE ALL CARDS"
            onPress={this.deleteAllCards}
          />
        </View>
        */}
        <Popup ref={popup => this.popup = popup }/>
      </View>
    )
  }
}

function mapStateToProps ({ activeDeck }) {
  return {
    activeDeck
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCard: (card) => dispatch(addCard(card)),
    deleteAllCards: (deckId) => dispatch(deleteAllCards(deckId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenAddCard)

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
  newCard: {
    padding: 15
  },
  newCardTextInput: {
    fontSize: 15
  },
  submitButtonWrapper: {
    alignItems: 'center'
  },
  deleteButtonWrapper: {
    position: 'absolute',
    bottom: 0
  }
})
