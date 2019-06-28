'use strict';

//  Off-canvas navigation menu. Works cited at bottom. 

// Game rules modals.

// Target modal
var gameRulesModal = document.getElementById('game-rules-modal');

// Target button that opens the modal
var gameRulesButton = document.getElementById('game-rules-modal-button');

// Get the <span> element that closes the modal
var gameRulesSpan = document.getElementsByClassName('close')[0];

// When the user clicks on the button, opens the modal 
gameRulesButton.onclick = function() {
  gameRulesModal.style.display = 'block';
};

// When the user clicks on <span> (x), closes the modal
gameRulesSpan.onclick = function() {
  gameRulesModal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, closes the modal.
window.onclick = function(event) {
  if (event.target === gameRulesModal) {
    gameRulesModal.style.display = 'none';
  }
};

// About the devs modals.

// Target modal
var aboutTheDevsModal = document.getElementById('about-devs-modal');

// Target button that opens the modal
var aboutTheDevsModalButton = document.getElementById('about-devs-modal-button');

// Get the <span> element that closes the modal
var aboutTheDevsModalSpan = document.getElementsByClassName('close')[0];

// When the user clicks on the button, opens the modal 
aboutTheDevsModalButton.onclick = function() {
  aboutTheDevsModal.style.display = 'block';
};

// When the user clicks on <span> (x), closes the modal
aboutTheDevsModalSpan.onclick = function() {
  aboutTheDevsModal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, closes the modal.
window.onclick = function(event) {
  if (event.target === aboutTheDevsModal) {
    aboutTheDevsModal.style.display = 'none';
  }
};


// Works Cited:

// Modal functionality: // https://www.w3schools.com/howto/howto_css_modals.asp




