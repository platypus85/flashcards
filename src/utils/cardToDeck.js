export function doesCardBelongToDeck(card, deck) {
  return card.deckId === deck.id;
}

export function showNumberOfCards(num) {
  return `${num} card${num === 1?'':'s'}`;
}
