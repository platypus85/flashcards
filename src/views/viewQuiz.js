import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';
import * as ScreenStyles from '../themes/default/screens';
import PrimaryButton from '../components/buttons/primaryButton';
import SubmitButton from '../components/buttons/submitButton';
import DangerButton from '../components/buttons/dangerButton';

const CARDSTATE_QUESTION = 1;
const CARDSTATE_ANSWER = 2;

const RESULT_CORRECT = 1;
const RESULT_INCORRECT = 0;

const initialState = {
  cardIdOrder: [],
  cardResults: [],
  cardState: CARDSTATE_QUESTION
};

function shuffle (array) {
  let [ i, j, temp ] = [ 0, 0, null ];

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

class ViewQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    this.restartQuiz();
  }
  componentWillUnmount() {
    this.restartQuiz();
  }
  restartQuiz = () => {
    const { activeDeck } = this.props;
    const { cardState } = initialState;
    let [ cardIdOrder, cardResults ] = [ initialState.cardIdOrder.slice(0), initialState.cardResults.slice(0) ];
    activeDeck.cards.map(card => {
      cardIdOrder.push(card.id);
    });
    shuffle(cardIdOrder);
    this.setState({ cardIdOrder, cardResults, cardState });
  }
  flipCard = () => {
    const { cardState } = this.state;
    this.setState({ cardState: cardState === CARDSTATE_QUESTION ? CARDSTATE_ANSWER : CARDSTATE_QUESTION });
  }
  markCorrect = () => {
    this.recordResult(RESULT_CORRECT);
  }
  markIncorrect = () => {
    this.recordResult(RESULT_INCORRECT);
  }
  recordResult = (result) => {
    let cardResults = this.state.cardResults.slice(0);
    cardResults.push(result);
    this.setState({ cardResults });
  }
  render() {
    const { cardIdOrder, cardResults, cardState } = this.state;

    if (cardResults.length === cardIdOrder.length) {
      clearLocalNotification()
        .then(setLocalNotification)
        .catch((error)=>{
           alert(error.message);
        });

      const score = cardResults.reduce((total, value) => total + value, 0);
      const perc = Math.round(score / cardResults.length * 100);

      return (
        <View style={styles.screen}>
          {/*<Text>{JSON.stringify(activeCard)}</Text>*/}
          <View>
            <Text style={styles.headerProgress}>Quiz Complete!</Text>
          </View>
          <View style={styles.wrap}>
            <View style={styles.header}>
              <Text style={styles.headerLabel}>SCORE:</Text>
              <Text style={styles.headerText}>{ score + ' (' + perc + '%)' }</Text>
              <PrimaryButton
                title="PLAY AGAIN"
                onPress={this.restartQuiz}
              />
            </View>
          </View>
        </View>
      )
    }

    const { activeDeck } = this.props;
    const activeCard = activeDeck.cards.filter(card => card.id === cardIdOrder[cardResults.length])[0];
    const currentQuestion = cardResults.length + 1;
    const totalQuestions = cardIdOrder.length;

    if (!activeCard) {
      return (
        <View style={styles.screen}>
          <View style={styles.header}>
            <Text style={styles.headerProgress}>Loading...</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.screen}>
        {/*<Text>{JSON.stringify(activeCard)}</Text>*/}
        <View>
          <Text style={styles.headerProgress}>Card { currentQuestion } / { totalQuestions }</Text>
        </View>
        <View style={styles.wrap}>
          <View style={styles.header}>
            <Text style={styles.headerLabel}>{ cardState === CARDSTATE_QUESTION ? 'QUESTION:' : 'ANSWER:' }</Text>
            <Text style={styles.headerText}>{ cardState === CARDSTATE_QUESTION ? activeCard.question : activeCard.answer }</Text>
            <PrimaryButton
              title={cardState === CARDSTATE_QUESTION ? 'Show Answer' : 'Show Question' }
              onPress={this.flipCard}
            />
          </View>
          <View style={styles.buttons}>
            {/*<SubmitButton
              title="Restart Quiz"
              onPress={this.restartQuiz}
            />*/}
            <SubmitButton
              title="CORRECT"
              onPress={this.markCorrect}
            />
          <DangerButton
              title="INCORRECT"
              onPress={this.markIncorrect}
            />
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps ({ activeDeck }) {
  return {
    activeDeck
  }
}

export default connect(
  mapStateToProps
)(ViewQuiz)

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
    justifyContent: 'flex-start'
  },
  headerProgress: {
    paddingTop: 20,
    paddingLeft: 20,
    fontSize: 15
  },
  headerLabel: {
    paddingTop: 20,
    fontSize: 12
  },
  headerText: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20
  },
  buttons: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 50
  }
})
