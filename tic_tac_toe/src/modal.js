import './styles/modal.css';
import {get} from 'lodash';
import Icon from '@material-ui/core/Icon';
import React from 'react';

class ModalForm extends React.Component {

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  constructMsg1() {
    let winnerFound = get(this.props,'winnerFound',false);
    let isTimeUp = get(this.props,'isGameOver',false);
    let isTie = get(this.props,'isTie',false);
    let message = {};
    if(winnerFound) {
      let winnerName = get(this.props,'winnerName','');
      message['message1'] = 'Wohoo!';
      message['message2'] = winnerName + ' is the winner!'
    } else if(isTimeUp) {
      message['message1'] = 'Oops! Time up.';
      message['message2'] = 'Try again.'
    } else if(isTie) {
      message['message1'] = 'It was a tie.'
      message['message2'] = 'Try again.'
    } else {
      console.log('Oops! Something went wrong.');
    }
    return message;
  }

  closeModal() {
    this.props.closeModal();
  }

  render() {
    let message = this.constructMsg1();
    return(
      <div className='showModalContainer'>
        <div className='transparent'></div>
        <section className='modalBody'>
          <Icon className='material-icon-close'
                onClick={this.closeModal}>close</Icon>
          <div className='message1'>{message['message1']}</div>
          <div className='message1'>{message['message2']}</div>
          <Icon className='material-icon-emotion'>sentiment_very_satisfied</Icon>
        </section>
      </div>
    )
  }
}

export default ModalForm;
