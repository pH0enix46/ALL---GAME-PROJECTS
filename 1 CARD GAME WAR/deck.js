// // //

// GLOBAL VARIABLE ----------✅✅✅
const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
// ----------⛔️⛔️⛔️

// DECK CLASS ----------✅✅✅
export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
    // console.log(cards);
  }

  get numberOfCards() {
    return this.cards.length;
  }

  pop() {
    return this.cards.shift();
  }

  push(card) {
    this.cards.push(card);
  }

  // ⏺ (Fisher-Yates Shuffle) Algorithm
  // i > 0 ensures the loop only swaps cards when there are two or more cards to swap
  // i >= 0 would add an unnecessary for final iteration where the first card swaps with itself, which serves no purpose
  // 0 <= random < 1
  // Time Complexity: O(n), Space Complexity: O(1)
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.cards[randomIndex], this.cards[i]] = [
        this.cards[i],
        this.cards[randomIndex],
      ];
    }
  }
}
// ----------⛔️⛔️⛔️

// CARD CLASS ----------✅✅✅
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
  }

  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.value = `${this.value}`;

    return cardDiv;
  }
}
// ----------⛔️⛔️⛔️

// FRESH DECK FUNCTION ----------✅✅✅
function freshDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}
// ----------⛔️⛔️⛔️
