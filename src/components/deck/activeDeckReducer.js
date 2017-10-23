import {GET_ACTIVE_DECK, SET_ACTIVE_DECK} from './activeDeckActions.js';

const initialState = {};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVE_DECK:
      return state;
    case SET_ACTIVE_DECK:
      return action.deck;
    default:
      return state;
  }
}
