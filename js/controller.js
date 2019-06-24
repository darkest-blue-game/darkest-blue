'use strict';

//Here will be the the methods and function that will be controlling the flow of the game.
//This is how all the objects will interact with ech other.


//This will be all global Variables
var playerName = document.getElementById('PlayerName');
var PlayerNameH1 = document.getElementById('Display Name');

//This will be the function the save the players name and start the game.
function handleSubmit(event) {
  // DONE: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  storePlayerName(playerName);
  showPlayerName();
}
var showPlayerName = function(){
  var displayName = JSON.parse(localStorage.getItem('Player Name'));
  PlayerNameH1.textContent = displayName;
};

var storePlayerName = function(PlayerName){
  localStorage.setItem('Player Name',JSON.stringify(PlayerName));
};

playerName.addEventListener('submit',handleSubmit);

Player.prototype.createPlayer = function(playerName){
  var newPlayer = new Player(playerName);
  var bossPlayer = new Player('boss');

};
