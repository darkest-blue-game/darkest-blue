'use strict';
//Player constructor
var Player = function (name) {
  this.name = name;
  this.remainingHealthPoints = 20;
  this.numberOfCardsPlayed = 0;
  this.numberOfTurnsPlayed = 0;
  this.nextTurn = false;
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

var Hand = function (owner,cards) {
  this.owner = owner;
  this.cards = cards;
  Hand.allCards.push(this);
};

//This is the creation of the game board
var createBoard = function(){
  newBoard = new Board;
  return newBoard;
};

//This function creates the players and the opponets
var createPlayer = function(playerName){
  new Player(playerName);
  new Player('boss');
};
