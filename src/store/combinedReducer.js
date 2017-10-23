import { combineReducers } from 'redux';
import decks from '../components/deck/deckReducer';
import activeDeck from '../components/deck/activeDeckReducer';
import cards from '../components/card/cardReducer';

export default combineReducers({
  decks,
  activeDeck,
  cards
});
