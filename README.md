# darkest-blue
Project Name: The Darkest Blue Game

Team Members: Fabian Brooks, Brandon Hurrington, Padma Ganapathi

Project Description: This is a card game that helps a player know more about the members of the darkest blue cohort at codefellows.

Problem Domain and Solution: The goal of the game for the player is to play against a simulated opponent and gather as many health points as possible while getting to know the members of our class. The player and opponent start with their own deck of 46 cards - 23 heal cards and 23 attack cards. The cards are randomly weighted and each card represents a positive or negative quality of a classmate. The player and the opponent start with 20 health points each. They can choose to play a heal card to gain healthpoints or play an attack card to reduce the opponent's health points. The game ends when either of their health points reaches zero.

Coding style:
  a. Naming conventions: Camel casing for all variable and function names
  b. Full descriptive names for variable and functions - no shorthands

File Structure:

     index.html - the landing intro page
  a. pages directory
     . game.html - the game board
     . result.html - the results page
  
  b. css directory
     . style.css - css styling

  c. js directory
     . model.js - object constructors. This file represents the shape of the data.
     . view.js - DOM manipulations and any code that affects the presentation layer.
     . controller.js - handles user requests and interactions