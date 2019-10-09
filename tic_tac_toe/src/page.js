import Content from './content';
import Footer from './footer';
import GameController from './controller';
import Header from './header';
import ModalForm from './modal';


import { get } from 'lodash';
import React from 'react';

const sybmol = {
  'player_1' : 'X',
  'player_2' : 'O',
};

const playerType = {
  'player_1' : 'Player 1',
  'player_2' : 'Player 2',
}

const maxTime = 15;
let interval;

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.handlePlayResetClick = this.handlePlayResetClick.bind(this);
    this.showModalHandler = this.showModalHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
  }

  componentDidMount() {
    this.setState(() => {
      return {
        matrix: [[],[],[]],
        player : 'player_1',
        reset: false,
        winnerFound: false,
        gameStarted: false,
        matrixLength: 0,
      }
    });
  }

  handlePlayResetClick(isReset) {
    if(isReset) {
      clearInterval(interval);
      this.setState(() => {
        return {
          gameStarted: true,
          matrix: [[],[],[]],
          player : 'player_1',
          winnerFound: false,
          seconds: maxTime,
          matrixLength: 0,
        }
      }, this.startTimer(maxTime))
    } else {
      this.setState(() => {
        return {
          gameStarted: true,
        }
      }, this.startTimer(maxTime));
    }
  }

  startTimer(maxTime) {
    let secondsRemaining =  maxTime;
    interval = setInterval(() => {
      if(secondsRemaining === 0) {
        clearInterval(interval);
        this.setState(() => {
          return {
            gameOver: true,
            winnerFound: false,
            showModal: true,
          }
        })
      } else {
        if(!get(this.state,'winnerFound',false)) {
          secondsRemaining = secondsRemaining - 1;
          this.setState(() => {
            return {
              seconds: secondsRemaining,
              gameOver: false,
            }

          }, this.showModalHandler)
        } else {
          clearInterval(interval);
          this.setState({
            winnerFound: true,
            showModal: true,
          })
        }
      }
    }, 1000);
  }

  resetTimer(maxTime) {
    if(interval) {
      clearInterval(interval);
    }
    this.startTimer(maxTime + 1);
  }

  handleTileClick(row, col, player) {
    const secondsRemaining = get(this.state,'seconds',maxTime);
    const isWinnerFound = get(this.state,'winnerFound',false);
    const isGameStarted = get(this.state,'gameStarted',false);
    let matrixLength = get(this.state,'matrixLength',0) + 1;
    if(secondsRemaining > 0 && !isWinnerFound && isGameStarted) {
      this.setMatrix(row, col, player);
      this.setMatrix(row, col, player);
      this.setState(() => {
        return {
          player: player === 'player_1' ? 'player_2' : 'player_1',
          matrixLength,
        }
      })
      this.resetTimer(maxTime);
    }
  }

  setMatrix(row, col, player) {
    let matrix = get(this.state,'matrix', [[],[],[]]);
    if(!matrix[row][col]) {
      matrix[row][col] = sybmol[player];
    } else {
      console.log('Click an empty box!');
    }
    this.setState(() => {
      return {
        matrix,
      }
    }, this.checkForWinner(matrix, row, col, player));
  }

  checkForWinner(matrix, row, col, player) {
    let winnerFound = get(this.state, 'winnerFound', false);
    if(this.checkHorizontal(matrix, row, col)) {
      winnerFound = !winnerFound;
    } else if(this.checkVertical(matrix, row, col)) {
      winnerFound = !winnerFound;
    } else if(this.checkDiagonal(matrix, row, col)) {
      winnerFound = !winnerFound;
    } else {
      console.log('continue playing!');
    }
    this.setState(() => {
      return {
        winnerFound : winnerFound,
        gameOver : winnerFound,
        winner : playerType[player],
      }
    })
  }

  checkHorizontal(matrix, row, col) {
    let matched = false;
    const currentVal = matrix[row][col];
    if(col === 0) {
      matched = (currentVal === matrix[row][col+1]) && (currentVal === matrix[row][col+2]);
    } else if(col === 1) {
      matched = (currentVal === matrix[row][col-1]) && (currentVal === matrix[row][col+1]);
    } else {
      matched = (currentVal === matrix[row][col-1]) && (currentVal === matrix[row][col-2]);
    }
    return matched;
  }

  checkVertical(matrix, row, col) {
    let matched = false;
    const currentVal = matrix[row][col];
    if(row === 0) {
      matched = (currentVal === matrix[row+1][col]) && (currentVal === matrix[row+2][col]);
    } else if(row === 1) {
      matched = (currentVal === matrix[row-1][col]) && (currentVal === matrix[row+1][col]);
    } else {
      matched = (currentVal === matrix[row-1][col]) && (currentVal === matrix[row-2][col]);
    }
    return matched;
  }

  checkDiagonal(matrix, row, col) {
    let matched = false;
    if(!matrix[1][1]) {
      return matched;
    } else {
      const centerVal = matrix[1][1];
      matched = ((centerVal === matrix[0][0]) &&
                  (centerVal === matrix[2][2])) ||
                ((centerVal === matrix[0][2]) &&
                  (centerVal === matrix[2][0]));
    }
    return matched;
  }

  isGameOver() {
    let secondsRemaining = get(this.state,'seconds',maxTime);
    return (secondsRemaining === 0);
  }

  isTie() {
    let winnerFound = get(this.state,'winnerFound',false);
    let matrixLength = get(this.state,'matrixLength',0);
    return !winnerFound && (matrixLength === 9);
  }

  showModalHandler() {
    console.log('showModalHandler: ', this.state);
    let showModal = get(this.state,'gameOver',false) || this.isTie();
      console.log('showModalHandler --- ', showModal);
    this.setState({
      showModal,
    });
  }

  closeModalHandler() {
    clearInterval(interval);
    this.setState({
      showModal: false,
      gameStarted: false,
      matrix: [[],[],[]],
      player : 'player_1',
      winnerFound: false,
      matrixLength: 0,
      seconds: maxTime,
    });
  }

  render() {
    return(
      <div style={{'background':'black', 'opacity':0.8, 'height':'55vw'}}>
      {
        get(this.state,'showModal',false) ?
          <ModalForm
             winnerFound={get(this.state,'winnerFound',false)}
             isGameOver={get(this.state,'gameOver',false)}
             winnerName={get(this.state,'winner','')}
             isTie={this.isTie()}
             closeModal={this.closeModalHandler}
          /> : ''
      }

        <Header />
        <Content
           handleTileClick={this.handleTileClick}
           matrixContent={get(this.state, 'matrix', [[],[],[]])}
           player={get(this.state, 'player', 'player_1')}
           playerName={playerType[get(this.state,'player','player_1')]}
           winnerFound={get(this.state,'winnerFound',false)}
           secondsRemaining={get(this.state,'seconds',maxTime)}
        />
        <GameController
          isGameOver={this.isGameOver()}
          isGameStarted={get(this.state,'gameStarted',false)}
          onPlayResetClick={this.handlePlayResetClick}
        />
        <Footer />
      </div>
    );
  }
}

export default Page;
