export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_ALL_DECKS = 'DELETE_ALL_DECKS';

export function getDecks(decks) {
  return {type: GET_DECKS, decks}
}

export function getDeck(deck) {
  return {type: GET_DECK, deck}
}

export function addDeck(deck) {
  return {type: ADD_DECK, deck}
}

export function deleteAllDecks() {
  return {type: DELETE_ALL_DECKS}
}
