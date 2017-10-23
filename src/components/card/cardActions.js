export const GET_CARDS = 'GET_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_ALL_CARDS = 'DELETE_ALL_CARDS';

export function getCards (cards) {
  return {
    type: GET_CARDS,
    cards
  }
}

export function addCard (card) {
  return {
    type: ADD_CARD,
    card
  }
}

export function deleteAllCards (forDeckId = null) {
  return {
    type: DELETE_ALL_CARDS,
    forDeckId
  }
}
