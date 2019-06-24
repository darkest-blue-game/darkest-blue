'use strict';

//Player constructor
var Player = function (name) {
  this.name = name;
  this.remainingHealthPoints = 0;
  this.numberOfCardsPlayed = 0;
  this.numberOfTurnsPlayed = 0;
  this.nextTurn = false;

  //array of players
  Player.allPlayers.push(this);
};

