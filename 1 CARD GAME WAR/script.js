// // //

// IMPORTED FILE ----------✅✅✅
import Deck from "./deck.js";
// ----------⛔️⛔️⛔️

// SELECTED THE ELEMENT ----------✅✅✅
const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const text = document.querySelector(".text");
const play = document.querySelector(".play");
const reset = document.querySelector(".reset");
// ----------⛔️⛔️⛔️

// GLOBAL VARIABLE ----------✅✅✅
const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
let playerDeck, computerDeck, inRound, stop;
// ----------⛔️⛔️⛔️

// PLAY THE GAME ----------✅✅✅
play.addEventListener("click", function () {
  if (stop) {
    startGame();
    return;
  }

  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});
// ----------⛔️⛔️⛔️

// RESTART THE GAME ----------✅✅✅
reset.addEventListener("click", function () {
  resetGame();
});
// ----------⛔️⛔️⛔️

// START GAME FUNCTION ----------✅✅✅
startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();
  // console.log(deck.cards);

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2); // 52/2=26
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  // console.log(playerDeck, computerDeck);
  inRound = false;
  stop = false;

  cleanBeforeRound();
}
// ----------⛔️⛔️⛔️

// CLEAN FUNCTION ----------✅✅✅
function cleanBeforeRound() {
  inRound = false;
  text.innerHTML = "";
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";

  updateDeckCount();
}
// ----------⛔️⛔️⛔️

// FLIP CARDS FUNCTION ----------✅✅✅
function flipCards() {
  inRound = true;

  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  // render
  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  updateDeckCount();

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "You Win 😇";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "You Lose 🥺";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    text.innerText = "Draw 😑";
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose! Try next time 🥺";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Win! Wanna try again? 😄";
    stop = true;
  }
}
// ----------⛔️⛔️⛔️

// UPDATE-DECK COUNT FUNCTION ----------✅✅✅
function updateDeckCount() {
  computerDeckElement.innerHTML = computerDeck.numberOfCards;
  playerDeckElement.innerHTML = playerDeck.numberOfCards;
}
// ----------⛔️⛔️⛔️

// ROUND WINNER FUNCTION ----------✅✅✅
function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}
// ----------⛔️⛔️⛔️

// GAME OVER FUNCTION ----------✅✅✅
function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
// ----------⛔️⛔️⛔️

// RESET GAME FUNCTION ----------✅✅✅
function resetGame() {
  startGame();
  text.innerText = "";
}
// ----------⛔️⛔️⛔️
