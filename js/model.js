'use strict';

//Player constructor
var Player = function (name) {
  this.name = name;
  this.remainingHealthPoints = 0;
  this.numberOfCardsPlayed = 0;
  this.numberOfTurnsPlayed = 0;
  this.nextTurn = false;

  //array of players
  Board.allPlayers.push(this);
};


var Board = function () {

};

var Card = function (avatar, type, weight, imageSrc, wildCard) {
  this.avatarName = avatar;
  this.cardType = type;
  this.cardWeight = weight;
  this.cardImageSrc = imageSrc;
  this.wildCard = wildCard;
  this.faceUp = false;

  Deck.allCards.push(this);
};

var Deck = function () {

};

var Hand = function (owner) {
  this.owner = owner;
  Hand.allCards.push(this);
};
