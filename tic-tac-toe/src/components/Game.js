import React from 'react';
import Header from './Header';
import Board from './Board';

const Game = function() {
  return(
    <div className="container text-center">
      <Header />
      <Board />
    </div>
  );
}

export default Game;
