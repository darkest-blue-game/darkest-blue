'use strict';
var opponentDeck = [];

var classMembers = ['Renee', 'Marisha', 'Promila', 'Manish', 'Chris', 'Sapana', 'Padma', 'Steven', 'Matt', 'Jack', 'Melfi', 'Nicholas', 'Kevin', 'Brandon', 'Fabian', 'Joashin', 'Peter', 'Trevor', 'Travis', 'Jackie', 'Jane', 'Roman', 'Nhu'];

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

function shuffleDeck(deck) {

  var i = 0;
  var tempi, tempj = [];
  while (i < deck.cards.length) {
    var j = Math.floor(Math.random() * (deck.cards.length));
    tempi = deck.cards[i];
    tempj = deck.cards[j];
    deck.cards[i] = tempj;
    deck.cards[j] = tempi;
    i++;
  }
  return deck;
}

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

  if (currentPlayer.name === 'Boss') {
    var index = Math.floor(Math.random() * 5);
    card = currentPlayer.hand.allCards[index];
  }
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

function createCards() {
  for (var i = 0; i < classMembers.length; i++) {
    new Card(classMembers[i], 'positive', Math.floor(Math.random() * 8));
    new Card(classMembers[i], 'negative', Math.floor(Math.random() * 8));
  }
}
createCards();
