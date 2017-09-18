#!/usr/bin/env node

'use strict';

(function ticTacToe() {
  var gameArray = Array(9);
  var playerOneTurn = true;
  var playerOneArray = [];
  var playerTwoArray = [];

  var init = function() {
    console.log("\n");
    console.log("Time to play TicTacToe!\n");
    console.log("__|__|__");
    console.log("__|__|__");
    console.log("  |  |  \n");
    console.log("Player 1 is 'X' and Player 2 is 'O'\n");
    console.log("Choose a number to make your move...\n");
    console.log("_1_|_2_|_3_");
    console.log("_4_|_5_|_6_");
    console.log(" 7 | 8 | 9 \n");
    console.log("Player 1, what's your move? (1-9)");

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
  }

  init();

  process.stdin.on('data', function (text) {
    //run function to update board and print it.
    var integer = parseInt(text, 10);
    if(!isNaN(integer)) {
      var inputIsValid = validateInput(integer);
      if(inputIsValid) {
        updatePlayerArray(integer);
        updateGameArray(integer);
        //if player one has made three or more moves, check winner
        if(playerOneArray.length > 2 ) {
          var winnerResult = isWinner();
          if (winnerResult !== null) {
            console.log(winnerResult + " is the winner!\n");
            process.exit();
          } else {
            if (playerOneArray.length === 5) {
              console.log("It's a draw :( \n");
              process.exit()
            } else {
              showNextPrompt();
            }
          }
        } else {
          showNextPrompt();
        }
      }

    } else {
      console.log("we'll need a number please ;)");
    }
  });

  var updateGameArray = function(integer) {
    if (playerOneTurn) {
      gameArray[integer-1] = "X";
      console.log(arrayToGameBoard(gameArray));
    } else {
      gameArray[integer-1] = "O";
      console.log(arrayToGameBoard(gameArray));
    }
  };

  var validateInput = function(integer) {
    var notFromOneToNine = "Please make sure your number is from 1-9";
    var duplicate = "Please make another selection because that spot has already been played ;)";

    //if the integer is in range and the that same spot hasn't been played before.
    var integerInRange = integer > 0 && integer < 10 ? true : console.log(notFromOneToNine);
    var spotNotTaken = typeof gameArray[integer-1] === "undefined" ? true : console.log(duplicate);

    if (integerInRange && spotNotTaken) {
      return true;
    } else {
      return false;
    }
  }

  var showNextPrompt = function() {
    var nextPromptPlayerOne = "Player 1, what's your move? (1-9)";
    var nextPromptPlayerTwo = "Player 2, what's your move? (1-9)";
    if(playerOneTurn) {
      console.log(nextPromptPlayerTwo);
      playerOneTurn = false;
    } else {
      console.log(nextPromptPlayerOne);
      playerOneTurn = true;
    }
  }

  var updatePlayerArray = function(integer) {
    if(playerOneTurn) {
      playerOneArray.push(integer);
    } else {
      playerTwoArray.push(integer);
    }
  }

  var arrayToGameBoard = function(array) {
    var stringArray;
    var string = "";

    var len = array.length;
    for (var i = 0; i < len; i++) {
      var toAdd;
      var element = array[i];
      if (element !== undefined) {
        toAdd = "_" + element + "_|";
      } else {
        if (i > 5) {
          toAdd = "   |";
        } else {
          toAdd = "___|";
        }

      }
      string += toAdd;
      //special formatting for last elements in the row
      if (i === 2 || i === 5 || i === 8) {
        string = string.substring(0, string.length-1);
        string += "\n";
      }
    }

    return string;
  }

  var isWinner = function() {
    var winningPlayer = null;
    if(playerOneTurn) {
      playerOneArray.sort();
      var horizontalWinner = isHorizontalWinner(playerOneArray);
      var verticalWinner = isVerticalWinner(playerOneArray);
      var diagonalWinner = isDiagonalWinner(playerOneArray);

      if(horizontalWinner || verticalWinner || diagonalWinner) {
        winningPlayer = "Player one";
      }
    } else {
      var horizontalWinner = isHorizontalWinner(playerTwoArray);
      var verticalWinner = isVerticalWinner(playerTwoArray);
      var diagonalWinner = isDiagonalWinner(playerTwoArray);

      if(horizontalWinner || verticalWinner || diagonalWinner) {
        winningPlayer = "Player two";
      }
    }
    return winningPlayer;
  }

  var isHorizontalWinner = function(playerArray) {
    var len = playerArray.length;
    var currentElement;
    for(var i = 0; i < len; i++) {

      currentElement = playerArray[i];
      if( currentElement === 1 || currentElement === 4 || currentElement === 7) {

        if( currentElement +1 === playerArray[i+1] && currentElement + 2 === playerArray[i+2]) {
          return true;
        }
      }
    }
    return false;
  }

  var isVerticalWinner = function(playerArray) {
    var len = playerArray.length;
    var currentElement;
    for(var i = 0; i < len; i++) {
      currentElement = playerArray[i];
      //we only need to run the vertical check on the first three spaces.
      if(currentElement < 4) {
        //checks to see if both spaces below current element are in the player array
        if( playerArray.indexOf(currentElement + 3) > -1 && playerArray.indexOf(currentElement + 6) > -1 ) {
          return true;
        }
      }
    }
    return false;
  }

  var isDiagonalWinner = function(playerArray) {
    var len = playerArray.length;
    var currentElement;
    for(var i = 0; i < len; i++) {
      currentElement = playerArray[i];
      //make sure array has start of diagonal pattern
      if (currentElement === 1) {
        if(playerArray.indexOf(5) > -1 &&
         playerArray.indexOf(9) > -1) {
          return true;
        }
      } else if(currentElement === 3) {
        if(playerArray.indexOf(5) > -1 &&
         playerArray.indexOf(7) > -1) {
          return true;
        }
      }
    }
    return false;
  }
})()
