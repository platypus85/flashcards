import {GET_CARDS, ADD_CARD, DELETE_ALL_CARDS} from './cardActions.js';

const initialState = [];

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return state;
    case ADD_CARD:
      return state.concat([action.card]);
    case DELETE_ALL_CARDS:
      if (action.forDeckId !== null) {
        return state.filter(card => card.deckId !== action.forDeckId);
      } else {
        return [];
      }
    default:
      return state;
  }
}
