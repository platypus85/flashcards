import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Popup from 'react-native-popup';
import * as ScreenStyles from '../themes/default/screens';
import SubmitButton from '../components/buttons/submitButton';
import { default as UUID } from 'uuid';
import { addDeck } from '../components/deck/deckActions';

const initialState = {
  title: ""
}

class ViewAddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  addDeck = () => {
    const { title } = this.state;
    if (title === '') {
      Keyboard.dismiss();
      this.popup.alert('Please enter a title.');
      return;
    }
    const id = UUID.v4();
    const timestamp = Date.now();
    this.props.addDeck({ id, title, timestamp });
    this.setState(initialState);
    Keyboard.dismiss();
    this.props.navigation.navigate('Decks');
    setTimeout(() => {
      this.props.navigation.navigate(
        'ViewDeck',
        { id }
      );
    }, 1);
  }
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerText}>What's the title of the deck?</Text>
        </View>
        <View style={styles.newDeck}>
          <TextInput style={styles.newDeckTextInput}
            value={this.state.title}
            placeholder="Enter title here"
            onChangeText={(title) => this.setState({ title })}
          ></TextInput>
        </View>
        <View style={styles.submitButtonWrapper}>
          <SubmitButton
            title="SUBMIT"
            onPress={this.addDeck}
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
    addDeck: (deck) => dispatch(addDeck(deck))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAddDeck)

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
    padding: 30
  },
  newDeckTextInput: {
    fontSize: 15
  },
  submitButtonWrapper: {
    alignItems: 'center'
  }
})
