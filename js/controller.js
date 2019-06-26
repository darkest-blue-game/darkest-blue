'use strict';

//Here will be the the methods and function that will be controlling the flow of the game.
//This is how all the objects will interact with ech other.


//This will be all global Variables
var playerForm = document.getElementById('PlayerName');
var playerNameH1 = document.getElementById('Display Name');
var playerHand = document.getElementById('PlayerHand');
var newBoard;
var playerName;
var newDeck;
var bossDeck = createDeck();
//This will be the function the save the players name and start the game.
function handleSubmit(event){
  // DONE: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  playerName = document.getElementById('name').value;
  storePlayerName(playerName);
  location.href ='./pages/game.html';
  var newBoard = createBoard();
  createPlayer(playerName);
  boardSetUp(newBoard);
  newDeck = createDeck();
  assignDeck(newDeck,bossDeck);
  newDeck = shuffleDeck(newDeck);
  assignHand();
  storeObjects();
  showPlayerName();
  playersTurn();
}
//This will allow players to select cards to attack with or defend
function handleGamePlay(event){
  event.preventDefault();
  for(var i = 0; i < 2; i++){
    var players = selectPlayer();
    playCard(players[0],players[1], players[0].card);
  }
}
//Player.allPlayers[0].remainingHealthPoints !==0 && Player.allPlayers[1].remainingHealthPoints !== 0
//This will select the card to play
var selectPlayer = function(){
  if(Player.allPlayers[0].nextTurn === true){
    Player.allPlayers[0].card = event.target;
    var id = Player.allPlayers[0].card.id;
    Player.allPlayers[0].hand.splice(id - 5,1);
    return[Player.allPlayers[0], Player.allPlayers[1]];
  }
  else{
    return[Player.allPlayers[1],Player.allPlayers[0]];
  }
};
//This will assign all the decks to the player and the boss
var assignDeck = function(newDeck,bossDeck){
  Player.allPlayers[0].deck = newDeck;
  Player.allPlayers[1].deck = bossDeck;
};
var assignHand = function(){
  Player.allPlayers[0].hand = drawCard(Player.allPlayers[0]);
  Player.allPlayers[1].hand = drawCard(Player.allPlayers[1]);
};
//This will contain all the game board setup functions
var boardSetUp = function(newBoard){
  newBoard.allPlayers.push(Player.allPlayers[0]);
  newBoard.allPlayers.push(Player.allPlayers[1]);
};
//This is to display the players name
var showPlayerName = function(){
  var displayName = localStorage.getItem('Player Name');
  playerNameH1.textContent = displayName;
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
var playersTurn = function(){
  var index = Math.floor(Math.random());
  Player.allPlayers[index].nextTurn = true;
};
//This the eventlistener
playerForm.addEventListener('submit',handleSubmit);
playerHand.addEventListener('click',handleGamePlay);

















