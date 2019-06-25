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
var Board = function (allPlayers = []) {
  this.allPlayers = allPlayers;
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

