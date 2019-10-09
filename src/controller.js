import './styles/controller.css';

import Button from '@material-ui/core/Button';
import React from 'react';
import { get } from 'lodash';

class GameController extends React.Component {

  constructor(props) {
    super(props);
    this.onPlayResetClick = this.onPlayResetClick.bind(this);
  }

  onPlayResetClick(isReset) {
    this.props.onPlayResetClick(isReset);
  }

  isReset() {
    let isGameOver = get(this.props,'isGameOver',false);
    let isGameStarted = get(this.props,'isGameStarted',false);
    return (isGameStarted && !isGameOver);
  }

  render() {
    let isReset = this.isReset();
    return (
      <div className='controllerBtnContainer'>
        <Button variant='contained'
                color='secondary'
                className={'controllerBtn' + (isReset ? ' resetStyle' : '')}
                onClick={() => this.onPlayResetClick(isReset)}>
          {isReset ? 'Reset' : 'Play'}
        </Button>
      </div>
    )
  }
}

export default GameController;
