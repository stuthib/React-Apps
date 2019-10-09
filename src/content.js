import './styles/content.css';
import { get } from 'lodash';
import React from 'react';

const maxTime = 5;

class Content extends React.Component {

  createMatrix() {
    let tiles = [];
    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 3; col++) {
        let isTitleSet = false;
        if(get(this.props, ['matrixContent', row, col])) {
          isTitleSet = true;
        }
        tiles.push(
          <div
            key={row+':'+col}
            className={'tileContainer' + (isTitleSet ? ' tileSet' : '')}
            onClick={() => this.props.handleTileClick(row,col,get(this.props,'player','player_1'))}
            >
              <div className='tileValueStyle'>
                {get(this.props, ['matrixContent',row,col], '')}
              </div>
          </div>
        )
      }
    }
    return tiles;
  }

  render() {
    return(
      <div className='contentContainer'>
        <div className='subContentText'>
          {'Remaining time : ' + get(this.props,'secondsRemaining',maxTime)}
        </div>
        <div className='gameBox'>
        {
          this.createMatrix()
        }
        </div>
        <div className='subContentText'>
          Current Player: {get(this.props,'playerName','')}
        </div>
      </div>
    );
  }
}

export default Content;
