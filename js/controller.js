'use strict';

//Here will be the the methods and function that will be controlling the flow of the game.
//This is how all the objects will interact with ech other.
//This will be all global Variables
var playerForm = document.getElementById('Player');
var playerNameH1 = document.getElementById('player-name');
var playerHand = document.getElementById('PlayerHand');
var gameScreen = document.getElementById('game-screen-center');
var winnerElement = document.getElementById('winner');
var winnerHealthElement = document.getElementById('winner-remaining-health');
var playerCards = document.getElementById('player-cards');
var opponentCards = document.getElementById('opponent-cards');
var divHand;
var blackOut = document.getElementById('lightout');
var divHandSet;
var newBoard;
var playerName;
var newDeck;

var sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
var bossDeck = createDeck();
//This will be the function the save the players name and start the game.
function handleSubmit(event) {
  // DONE: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  playerName = document.getElementById('name').value;
  console.log(playerName);
  storePlayerName(playerName);
  location.href = './pages/game.html';
}

var secondLoad = function () {
  var newBoard = createBoard();
  showPlayerName();
  createPlayer(playerName);
  boardSetUp(newBoard);
  newDeck = createDeck();
  assignDeck(newDeck, bossDeck);
  newDeck = shuffleDeck(newDeck);
  assignHand();
  storeObjects();
};

//This will allow players to select cards to attack with or defend
function handleGamePlay(event) {
  event.preventDefault();

  var cardPlayed = event.target;
  var id = cardPlayed.id;

  divHand = document.getElementById(id);
  divHandSet = id;
  divHand.setAttribute('id', 'discarded');

  var players = selectPlayer();

  sleep(1000).then(() =>{
    gameScreen.setAttribute('id','gameScreen');
    playCard(players[0], players[1], players[2]);
  });

  sleep(2000).then(() =>{setGameScreen();});
  sleep(3000).then(() =>{
    playCard(Player.allPlayers[1], Player.allPlayers[0]);
    gameScreen.setAttribute('id','gameScreen');
    blackOut.setAttribute('id','blackout');
  });

  sleep(5000).then(() =>{setGameScreen();});
  if (Player.allPlayers[0].remainingHealthPoints <= 0 || Player.allPlayers[1].remainingHealthPoints <= 0) {
    storeObjects();
    location.href = './result.html';
  }

  sleep(2000).then(() =>{
    assignHand(players[3]);
  });
}

//This will set game screen id back to orginal
var setGameScreen = function(){
  gameScreen.setAttribute('id','game-screen-center');
  divHand.setAttribute('id',divHandSet);
  blackOut.setAttribute('id','lightout');
  console.log(blackOut.id);
};

//This will select the card to play
var selectPlayer = function () {
  if (Player.allPlayers[0].nextTurn === true) {
    var cardPlayed = event.target;
    var id = cardPlayed.id;
    cardPlayed = Player.allPlayers[0].hand.splice(id - 5, 1)[0];
    return [Player.allPlayers[0], Player.allPlayers[1], cardPlayed, id - 5];
  }
  else {
    return [Player.allPlayers[1], Player.allPlayers[0]];
  }
};

//This will assign all the decks to the player and the boss
var assignDeck = function (newDeck, bossDeck) {
  Player.allPlayers[0].deck = newDeck;
  Player.allPlayers[1].deck = bossDeck;
};
var assignHand = function (handIndex) {
  Player.allPlayers[0].hand = drawCard(Player.allPlayers[0], handIndex);
  Player.allPlayers[1].hand = drawCard(Player.allPlayers[1]);
  for (var i = 0; i < Player.allPlayers[0].hand.length; i++) {
    var j = i + 5;
    var k = JSON.stringify(j);
    var divId = document.getElementById(k);
    var child = divId.children[0];
    child.src = Player.allPlayers[0].hand[i].cardImageSrc;

    if (handIndex === undefined) {
      var p1 = document.createElement('p');
      var p2 = document.createElement('p');
      var p3 = document.createElement('p');
      p1.setAttribute('id', 'p1' + k);
      p2.setAttribute('id', 'p2' + k);
      p3.setAttribute('id', 'p3' + k);
      divId.appendChild(p1);
      divId.appendChild(p2);
      divId.appendChild(p3);
    }
    else {
      p1 = document.getElementById('p1' + k);
      p2 = document.getElementById('p2' + k);
      p3 = document.getElementById('p3' + k);
      p1.textContent = '';
      p2.textContent = '';
      p3.textContent = '';
    }
    p1.textContent = Player.allPlayers[0].hand[i].cardWeight;
    p2.textContent = Player.allPlayers[0].hand[i].avatarName;
    p3.textContent = Player.allPlayers[0].hand[i].cardType;

  }
};

//This will contain all the game board setup functions
var boardSetUp = function (newBoard) {
  newBoard.allPlayers.push(Player.allPlayers[0]);
  newBoard.allPlayers.push(Player.allPlayers[1]);
};

//This is to display the players name
var showPlayerName = function () {
  playerName = localStorage.getItem('PlayerName');
  playerNameH1.textContent = playerName;
};

//This will store the players name
var storePlayerName = function (PlayerName) {
  localStorage.setItem('PlayerName', PlayerName);
};

//This will store the player objects to local storage
var storeObjects = function () {
  localStorage.setItem('Player', JSON.stringify(Player.allPlayers[0]));
  localStorage.setItem('Opponent', JSON.stringify(Player.allPlayers[1]));
  localStorage.setItem('Game Board', JSON.stringify(newBoard));
};

//These are eventlisteners
if (playerForm !== null) {
  playerForm.addEventListener('submit', handleSubmit);
}
if (playerHand !== null) {
  secondLoad();
  if (Player.allPlayers[0].remainingHealthPoints <= 0 || Player.allPlayers[1].remainingHealthPoints <= 0) {
    Player.allPlayers[0].nextTurn = false;
    console.log(Player.allPlayers[0].remainingHealthPoints);
    storeObjects();
    location.href = './result.html';
  }
  if (Player.allPlayers[0].nextTurn === true) {
    sleep(200).then(() =>{ playerHand.addEventListener('click', handleGamePlay, true);});
  }
}

if (winnerElement !== null) {
  console.log('in winner element');
  determineWinner();
}
function determineWinner() {
  var playerFromStorage = localStorage.getItem('Player');
  var unstringifyPlayer = JSON.parse(playerFromStorage);

  var opponentFromStorage = localStorage.getItem('Opponent');
  var unstringifyOpponent = JSON.parse(opponentFromStorage);

  if (unstringifyPlayer.remainingHealthPoints <= 0) {
    winnerElement.textContent = 'Winner: ' + unstringifyOpponent.name;
    winnerHealthElement.textContent = 'Remaining Health: ' + unstringifyOpponent.remainingHealthPoints;
  } else {
    if (unstringifyOpponent.remainingHealthPoints <= 0) {
      winnerElement.textContent = 'Winner: ' + unstringifyPlayer.name;
      winnerHealthElement.textContent = 'Remaining Health: ' + unstringifyPlayer.remainingHealthPoints;
    }
  }
  opponentCards.textContent = 'Number of cards played by opponent: ' + unstringifyOpponent.numberOfCardsPlayed;
  playerCards.textContent = 'Number of cards played by player: ' + unstringifyPlayer.numberOfCardsPlayed;

}
