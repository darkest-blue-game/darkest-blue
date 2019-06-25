'use strict';

//Here will be the the methods and function that will be controlling the flow of the game.
//This is how all the objects will interact with ech other.


//This will be all global Variables
var playerName = document.getElementById('PlayerName');
var PlayerNameH1 = document.getElementById('Display Name');
var newBoard;
var newDeck;
//This will be the function the save the players name and start the game.
function handleSubmit(event) {
  // DONE: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  playerName = document.getElementById('name').value;
  storePlayerName(playerName);
  showPlayerName();
  var newBoard = createBoard();
  createPlayer(playerName);
  boardSetUp(newBoard);
  newDeck = createDeck();
  assignDeck(newDeck);
  storeObjects();
}
var assignDeck = function(newDeck){
  Player.allPlayers[0].deck = newDeck;
};
//This will contain all the game board setup functions
var boardSetUp = function(newBoard){
  newBoard.allPlayers.push(Player.allPlayers[0]);
  newBoard.allPlayers.push(Player.allPlayers[1]);
};
//This is to display the players name
var showPlayerName = function(){
  var displayName = localStorage.getItem('Player Name');
  PlayerNameH1.textContent = displayName;
};
//This will store the players name
var storePlayerName = function(PlayerName){
  localStorage.setItem('Player',JSON.stringify(PlayerName));
};
//This will store the player objects to local storage
var storeObjects = function(){
  localStorage.setItem('Player',JSON.stringify(Player.allPlayers[0]));
  localStorage.setItem('Opponent',JSON.stringify(Player.allPlayers[1]));
  localStorage.setItem('Game Board',JSON.stringify(newBoard));
};


//This the eventlistener
playerName.addEventListener('submit',handleSubmit);
















