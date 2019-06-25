'use strict';
var opponetDeck = [];
//Player constructor
var Player = function (name) {
  this.name = name;
  this.remainingHealthPoints = 20;
  this.numberOfCardsPlayed = 0;
  this.numberOfTurnsPlayed = 0;
  this.nextTurn = false;
  this.deck = Deck;
  this.discardPile = Deck;
  this.hand = Hand;
  //array of players
  Player.allPlayers.push(this);
};
Player.allPlayers = [];
var Board = function (allPlayers = [], allCards = []) {
  this.allPlayers = allPlayers;
  this.allCards = allCards;
};
var Card = function (avatar, type, weight, imageSrc, wildCard) {
  this.avatarName = avatar;
  this.cardType = type;
  this.cardWeight = weight;
  this.cardImageSrc = imageSrc;
  this.wildCard = wildCard;
  this.faceUp = false;

  Card.allCards.push(this);
};
Card.allCards = [];

var Deck = function (cards) {
  this.cards = cards;
};

var Hand = function (owner, cards) {
  this.owner = owner;
  this.cards = cards;
  Hand.allCards.push(this);
};
Hand.allCards = [];
//This will create deck
var createDeck = function () {
  newDeck = new Deck(Card.allCards);
  console.log(newDeck);
  return newDeck;
};
Hand.allCards = [];
//This is the creation of the game board
var createBoard = function () {
  newBoard = new Board;
  return newBoard;
};
//This function creates the players and the opponets
var createPlayer = function (playerName) {
  new Player(playerName);
  new Player('boss');
};
/*function createPlayer(playerName) {
  new Player(playerName);
}
*/
function shuffleDeck(deck) {
  //console.log('deck length: ' + deck.cards.length + deck.cards[0].avatarName);
  var i = 0;
  var tempi, tempj = [];
  while (i < deck.cards.length) {
    var j = Math.floor(Math.random() * (deck.cards.length));
    //console.log('i and j ', i, j);
    tempi = deck.cards[i];
    tempj = deck.cards[j];
    deck.cards[i] = tempj;
    deck.cards[j] = tempi;
    //console.log('deck[i] ' + deck.cards[i].avatarName);
    //console.log('deck[j] ' + deck.cards[j].avatarName);
    i++;
  }
  return deck;
}

/*
function drawCard(deck, hand) {
  for (var i = 0; i < 5; i++) {
    if (deck.cards.length === 0) {
      //deck = shuffleDeck(discardedPile);
      console.log('Deck empty');
    }
    if (hand.allCards.length < 4) {
      hand.allCards.push(deck.cards.pop());
    } else {
      break;
    }
  }
  return hand.allCards;
}
*/
function drawCard(player) {
  for (var i = 0; i < 5; i++) {
    if (player.deck.cards.length === 0) {
      player.deck = shuffleDeck(player.discardPile);
      console.log('Deck empty');
    }
    if (player.hand.allCards.length < 5) {
      player.hand.allCards.push(player.deck.cards.pop());
    } else {
      break;
    }
  }
  return player.hand.allCards;
}

function playCard(currentPlayer, otherPlayer, card) {
  var healthPoints = 0;
  //var newCard = card;
  if (card.cardType === 'positive') {
    healthPoints = currentPlayer.remainingHealthPoints + card.cardWeight;
    currentPlayer.remainingHealthPoints = healthPoints;
  }

  if (card.cardType === 'negative') {
    healthPoints = otherPlayer.remainingHealthPoints - card.cardWeight;
    otherPlayer.remainingHealthPoints = healthPoints;
  }
  currentPlayer.nextTurn = false;
  otherPlayer.nextTurn = true;
  currentPlayer.discardPile.cards.push(card);
}


function createCard(avatarName, cardType, cardWeight) {
  new Card(avatarName, cardType, cardWeight);
}

createCard('Renee', 'positive', Math.floor(Math.random() * 8));
createCard('Renee', 'negative', Math.floor(Math.random() * 8));
createCard('Marisha', 'positive', Math.floor(Math.random() * 8));
createCard('Marisha', 'negative', Math.floor(Math.random() * 8));
createCard('Sapana', 'positive', Math.floor(Math.random() * 8));
createCard('Sapana', 'negative', Math.floor(Math.random() * 8));
createCard('Fabian', 'positive', Math.floor(Math.random() * 8));
createCard('Fabian', 'negative', Math.floor(Math.random() * 8));
createCard('Brandon', 'positive', Math.floor(Math.random() * 8));
createCard('Brandon', 'negative', Math.floor(Math.random() * 8));
createCard('Padma', 'positive', Math.floor(Math.random() * 8));
createCard('Padma', 'negative', Math.floor(Math.random() * 8));
createCard('Promila', 'positive', Math.floor(Math.random() * 8));
createCard('Promila', 'negative', Math.floor(Math.random() * 8));
createCard('Manish', 'positive', Math.floor(Math.random() * 8));
createCard('Manish', 'negative', Math.floor(Math.random() * 8));
createCard('Chris', 'positive', Math.floor(Math.random() * 8));
createCard('Chris', 'negative', Math.floor(Math.random() * 8));
createCard('Steven', 'positive', Math.floor(Math.random() * 8));
createCard('Steven', 'negative', Math.floor(Math.random() * 8));
createCard('Jack', 'positive', Math.floor(Math.random() * 8));
createCard('Jack', 'negative', Math.floor(Math.random() * 8));
createCard('Matt', 'positive', Math.floor(Math.random() * 8));
createCard('Matt', 'negative', Math.floor(Math.random() * 8));
createCard('Melfi', 'positive', Math.floor(Math.random() * 8));
createCard('Melfi', 'negative', Math.floor(Math.random() * 8));
createCard('Nicholas', 'positive', Math.floor(Math.random() * 8));
createCard('Nicholas', 'negative', Math.floor(Math.random() * 8));
createCard('Kevin', 'positive', Math.floor(Math.random() * 8));
createCard('Kevin', 'negative', Math.floor(Math.random() * 8));
createCard('Joashen', 'positive', Math.floor(Math.random() * 8));
createCard('Joashen', 'negative', Math.floor(Math.random() * 8));
createCard('Jackie', 'positive', Math.floor(Math.random() * 8));
createCard('Jackie', 'negative', Math.floor(Math.random() * 8));
createCard('Nhu', 'positive', Math.floor(Math.random() * 8));
createCard('Nhu', 'negative', Math.floor(Math.random() * 8));
createCard('Roman', 'positive', Math.floor(Math.random() * 8));
createCard('Roman', 'negative', Math.floor(Math.random() * 8));
createCard('Trevor', 'positive', Math.floor(Math.random() * 8));
createCard('Trevor', 'negative', Math.floor(Math.random() * 8));
createCard('Travis', 'positive', Math.floor(Math.random() * 8));
createCard('Travis', 'negative', Math.floor(Math.random() * 8));
createCard('Peter', 'positive', Math.floor(Math.random() * 8));
createCard('Peter', 'negative', Math.floor(Math.random() * 8));
createCard('Jane', 'positive', Math.floor(Math.random() * 8));
createCard('Jane', 'negative', Math.floor(Math.random() * 8));

/*
var deck = new Deck(Card.allCards);
console.log('deck ' + deck.cards[0].avatarName);

var shuffledDeck = shuffleDeck(deck);
console.log('shuffled deck ' + shuffledDeck.cards[0].avatarName);

var playerPadma = new Player('Padma');
//playCard(playerPadma, deck.cards[0]);

var newCard = Card.allCards[0];

playCard(playerPadma, newCard);

console.log('Player points: ' + playerPadma.remainingHealthPoints);
*/

