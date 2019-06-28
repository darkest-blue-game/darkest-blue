'use strict';
var opponentDeck = [];

//variable to keep track of plays to update the scrolling Marquee container
var logArray = '';

var classMembers = ['Renee', 'Marisha', 'Promila', 'Manish', 'Chris', 'Sapana', 'Padma', 'Steven', 'Matt', 'Jack', 'Melfi', 'Nicholas', 'Kevin', 'Brandon', 'Fabian', 'Joachen', 'Peter', 'Trevor', 'Travis', 'Jackie', 'Jane', 'Roman', 'Nhu'];
var wildCards = ['Nicholas','Dan','Aliya','Chris'];

//Player constructor
var Player = function (name) {
  this.name = name;
  this.remainingHealthPoints = 15;
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

//Player and the opponent get their own deck of cards
var Deck = function (cards = []) {
  this.cards = [...cards];
};

//Player and opponent have 5 cards in hand at a time
var Hand = function (cards) {
  this.cards = cards;
  Hand.allCards.push(this);
};
Hand.allCards = [];

//This will create deck
var createDeck = function () {
  newDeck = new Deck(Card.allCards);
  return newDeck;
};

//This is the creation of the game board
var createBoard = function () {
  newBoard = new Board;
  return newBoard;
};

//This function creates the player and the opponent (The Astrologer)
var createPlayer = function (playerName) {
  new Player(playerName);
  Player.allPlayers[0].nextTurn = true;
  new Player('The Astrologer');
};

//Adaptation of Fisher-Yates shuffle alogorithm
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

//Function to draw cards - 5 cards for initial hand and one card each turn after playing a card from hand
function drawCard(player, handIndex) {
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

//playCard decreases/increases health points of opponent and player accordingly
//It moves the played card to discard pile, sets next turn, increments the number of cards played by current player
//and updates the results on screen 

function playCard(currentPlayer, otherPlayer, card) {
  var healthPoints = 0;

  if (currentPlayer.name === 'The Astrologer') {
    var index = Math.floor(Math.random() * 5);
    card = currentPlayer.hand.splice(index, 1)[0];
  }

  var playerHealth = document.getElementById('playerHealth');
  var opponentHealth = document.getElementById('opponentHealth');
  var gameLog = document.getElementById('game-log');

  var breakTag = '<br>';
  //var breakTag = document.createElement('<br>');

  if (card.cardType === 'heal') {
    healthPoints = currentPlayer.remainingHealthPoints + card.cardWeight;
    currentPlayer.remainingHealthPoints = healthPoints;
    if (currentPlayer.name === 'The Astrologer') {
      updateHealth(opponentHealth, card.cardType, card.cardWeight);
    } else {
      updateHealth(playerHealth, card.cardType, card.cardWeight);
    }
    logArray = logArray + currentPlayer.name + ' healed by gaining ' + JSON.stringify(card.cardWeight) + ' points. ' + breakTag;
  }

  if (card.cardType === 'attack') {
    healthPoints = otherPlayer.remainingHealthPoints - card.cardWeight;
    otherPlayer.remainingHealthPoints = healthPoints;
    if (currentPlayer.name === 'The Astrologer') {
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

//Function to create 46 cards for the game

function createCards() {
  for (var i = 0; i < classMembers.length; i++) {
    new Card(classMembers[i], 'heal', Math.floor(Math.random() * 7) + 1);
    new Card(classMembers[i], 'attack', Math.floor(Math.random() * 7) + 1);
  }
}
createCards();

//Function to increment or subtract health in the progress bar

function updateHealth(healthElement, cardType, cardWeight) {

  if (cardType === 'heal') {
    healthElement.value += cardWeight;
  }
  if (cardType === 'attack') {
    healthElement.value -= cardWeight;
  }
}



