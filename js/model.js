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
var createDeck = function(){
  newDeck = new Deck(Card.allCards);
  console.log(newDeck);
  return newDeck;
};

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
  var i = 0;
  while (i < deck.length) {
    var j = Math.floor(Math.random() * (i + 1));
    var tempi = deck[i];
    var tempj = deck[j];
    deck[i] = tempj;
    deck[j] = tempi;
    i++;
  }
  return deck;
}
function shuffleDeck(deck) {
  var i = 0;
  while (i < deck.length) {
    var j = Math.floor(Math.random() * (i + 1));
    var tempi = deck[i];
    var tempj = deck[j];
    deck[i] = tempj;
    deck[j] = tempi;
    i++;
  }
  return deck;
}


function drawCard(deck, hand) {
  if (deck.length === 0) {
    //shuffle discarded pile and move that to deck
    console.log('Deck empty');
  }
  if (hand.length < 4) { 
    hand.allCards.push(deck.cards.pop());
  }
  return hand.allCards;
}

function createCard(avatarName, cardType, cardWeight) {
  new Card(avatarName, cardType, cardWeight);
}

createCard('Renee', 'positive', 3);
createCard('Renee', 'negative', 1);
createCard('Marisha', 'positive', 2);
createCard('Marisha', 'negative', 6);
createCard('Sapana', 'positive', 1);
createCard('Sapana', 'negative', 2);
createCard('Fabian', 'positive', 3);
createCard('Fabian', 'negative', 5);
createCard('Brandon', 'positive', 6);
createCard('Brandon', 'negative', 4);
createCard('Padma', 'positive', 3);
createCard('Padma', 'negative', 6);