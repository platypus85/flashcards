export const GET_ACTIVE_DECK = 'GET_ACTIVE_DECK';
export const SET_ACTIVE_DECK = 'SET_ACTIVE_DECK';

export function getActiveDeck () {
  return {
    type: SET_ACTIVE_DECK
  }
}

export function setActiveDeck (deck) {
  return {
    type: SET_ACTIVE_DECK,
    deck
  }
}
