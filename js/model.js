'use strict';
var opponentDeck = [];

var classMembers = ['Renee', 'Marisha', 'Promila', 'Manish', 'Chris', 'Sapana', 'Padma', 'Steven', 'Matt', 'Jack', 'Melfi', 'Nicholas', 'Kevin', 'Brandon', 'Fabian', 'Joachen', 'Peter', 'Trevor', 'Travis', 'Jackie', 'Jane', 'Roman', 'Nhu'];

//Player constructor
var Player = function (name) {
  this.name = name;
  this.remainingHealthPoints = 20;
  this.numberOfCardsPlayed = 0;
  this.numberOfTurnsPlayed = 0;
  this.nextTurn = false;
  this.card = Card;
  this.deck = Deck;
  this.discardPile = new Deck;
  this.hand = [];
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

var Deck = function (cards = []) {
  this.cards = cards;
};

var Hand = function (cards) {
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

//This is the creation of the game board
var createBoard = function () {
  newBoard = new Board;
  return newBoard;
};

//This function creates the players and the opponents
var createPlayer = function (playerName) {
  new Player(playerName);
  Player.allPlayers[0].nextTurn = true;
  new Player('boss');
  Player.allPlayers[1].remainingHealthPoints = 2;
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

function drawCard(player, handIndex) {
  console.log(player);
  for (var i = 0; i < 5; i++) {
    if (player.deck.cards.length === 0) {
      player.deck = shuffleDeck(player.discardPile);
      console.log('Deck empty');
    }
    if (player.hand.length < 5) {
      var card = player.deck.cards.pop();
      player.hand.splice(handIndex, 0, card);
    } else {
      break;
    }
  }
  return player.hand;
}
var logArray = '';

function playCard(currentPlayer, otherPlayer, card) {
  var healthPoints = 0;

  if (currentPlayer.name === 'boss') {
    var index = Math.floor(Math.random() * 5);
    card = currentPlayer.hand.splice(index, 1)[0];
    // card = cardArr[0];
    // currentPlayer.hand.allCards.splice(index, 1);
  }

  var playerHealth = document.getElementById('playerHealth');
  var opponentHealth = document.getElementById('opponentHealth');
  var gameLog = document.getElementById('game-log');

  var breakTag = '<br>';
  //var breakTag = document.createElement('<br>');

  if (card.cardType === 'heal') {
    healthPoints = currentPlayer.remainingHealthPoints + card.cardWeight;
    currentPlayer.remainingHealthPoints = healthPoints;
    if (currentPlayer.name === 'boss') {
      updateHealth(opponentHealth, card.cardType, card.cardWeight);
    } else {
      updateHealth(playerHealth, card.cardType, card.cardWeight);
    }
    console.log('Log Array: ' + logArray);
    logArray = logArray + currentPlayer.name + ' healed by gaining ' + JSON.stringify(card.cardWeight) + ' points. ' + breakTag;
  }

  if (card.cardType === 'attack') {
    healthPoints = otherPlayer.remainingHealthPoints - card.cardWeight;
    otherPlayer.remainingHealthPoints = healthPoints;
    if (currentPlayer.name === 'boss') {
      updateHealth(playerHealth, card.cardType, card.cardWeight);
    } else {
      updateHealth(opponentHealth, card.cardType, card.cardWeight);
    }

    logArray = logArray + currentPlayer.name + ' attacked opponent for ' + JSON.stringify(card.cardWeight) + ' points. ' + breakTag;
  }
  currentPlayer.nextTurn = false;
  otherPlayer.nextTurn = true;
  currentPlayer.discardPile.cards.push(card);
  currentPlayer.numberOfCardsPlayed++;
  gameLog.innerHTML = logArray;
}

function createCards() {
  for (var i = 0; i < classMembers.length; i++) {
    new Card(classMembers[i], 'heal', Math.floor(Math.random() * 7) + 1);
    new Card(classMembers[i], 'attack', Math.floor(Math.random() * 7) + 1);
  }
}
createCards();

function updateHealth(healthElement, cardType, cardWeight) {

  if (cardType === 'heal') {
    healthElement.value += cardWeight;
  }
  if (cardType === 'attack') {
    healthElement.value -= cardWeight;
  }
}



