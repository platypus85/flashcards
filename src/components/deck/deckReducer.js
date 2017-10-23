import {GET_DECKS, ADD_DECK, DELETE_ALL_DECKS} from './deckActions.js';

const initialState = [];

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_DECKS:
      return state;
    case ADD_DECK:
      return state.concat([action.deck]);
    case DELETE_ALL_DECKS:
      return [];
    default:
      return state;
  }
}
