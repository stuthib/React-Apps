import React from 'react';
import Square from './Square';
import constants from '../constants';

const TIME_REMAINING = 10;
const REMAINING_TIME = constants.REMAINING_TIME;
const NEXT_PLAYER = constants.NEXT_PLAYER;
const WINNER = constants.WINNER;
const GAME_OVER = constants.GAME_OVER;

var boardRow = {
  clear: 'both',
  content: "",
  display: 'table'
};

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares : Array(9).fill(null),
      isNext : true,
      remainingTime : TIME_REMAINING,
      timer : null,
      isGameOver : false
    };
    this.handleSquareButtonClick = this.handleSquareButtonClick.bind(this);
  }

  handleSquareButtonClick(i) {
    clearInterval(this.state.timer);
    const square = this.state.squares.slice();
    if(this.calculateWinner(square) || square[i] || this.state.isGameOver) {
      return;
    }
    square[i] = this.state.isNext ? 'x' : 'o';
    this.setState(function(prevState) {
      return {
        squares: square,
        isNext : !prevState.isNext,
        remainingTime : TIME_REMAINING,
        timer : prevState.timer,
        isGameOver : prevState.isGameOver
      }
    });

    this.startTimer();
  }

  startTimer() {
    const timer = setInterval(this.updateTimer.bind(this), 1000);
    this.setState(function(prevState) {
      return{
        squares : prevState.squares,
        isNext : prevState.isNext,
        remainingTime : prevState.remainingTime,
        timer : timer,
        isGameOver : prevState.isGameOver
      }
    });
  }

  calculateWinner(squares) {
    const lines = [
                  [0,1,2],
                  [3,4,5],
                  [6,7,8],
                  [0,3,6],
                  [1,4,7],
                  [2,5,8],
                  [0,4,8],
                  [2,4,6]
                ];
    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  updateTimer() {
    this.setState(function(prevState) {
      return{
        isGameOver : false,
        remainingTime : prevState.remainingTime - 1
      }
    });
    if(this.state.remainingTime < 1 || this.calculateWinner(this.state.squares)) {
      this.setState(function(prevState) {
        return{
          isGameOver : true,
          remainingTime : TIME_REMAINING
        }
      });
      clearInterval(this.state.timer);
    }
  }

  renderSquare(i) {
    return (
      <Square
        onSquareClick={() => this.handleSquareButtonClick(i)}
        value={this.state.squares[i]}
      />
    );
  }

  render() {
    let winner = this.calculateWinner(this.state.squares);
    const gameOver = this.state.isGameOver;
    let status;
    let gameStatus;
    if(winner) {
      status = WINNER + winner;
    } else {
      status = NEXT_PLAYER + (this.state.isNext ? 'x' : 'o');
    }

    if(gameOver) {
      gameStatus = GAME_OVER;
    } else {
      gameStatus = REMAINING_TIME + this.state.remainingTime + 's';
    }

    return (
      <div className="well well-sm">
        <h4>{gameStatus}</h4>
        <h4>{status}</h4>
        <div className="container text-center">
          <div style={boardRow}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div style={boardRow}>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div style={boardRow}>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  };
}

export default Board;
