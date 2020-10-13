import React from 'react';
import Button from '@material-ui/core/Button';
import './Collaborate.css';
import { get, map } from 'lodash';
/* Spotify API add-on */
import SpotifyWebApi from 'spotify-web-api-js';
/* Socket.io add-on */
import socketIOClient from "socket.io-client";
const spotifyApi = new SpotifyWebApi();
const ENDPOINT = "http://localhost:5000";
const socket = socketIOClient(ENDPOINT);

function registerHandler(onMessageReceived) {
  //socket.on('message', onMessageReceived)
  socket.on('priv', onMessageReceived);
}

function unregisterHandler() {
  socket.off('priv');
}

class DashboardNew extends React.Component {

  constructor(props) {
    super(props);
    this.socket = socketIOClient();
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.state = {
      host: '',
      showCollaberateRequest: false,
    };
  }

  componentDidMount() {
    this.registerUser();
    registerHandler(this.onMessageReceived);
  }

  componentWillUnmount() {
    unregisterHandler();
  }

  registerUser() {
    console.log('register a new user when login successful.');
    let userDetails = get(this.props,'userDetails','');
    userDetails['accessToken'] = spotifyApi.getAccessToken();
    socket.emit('authenticatedUser', {user: userDetails}, function(data) {
      if(data) {
        console.log('accepted');
      } else {
        console.log('failed');
      }
    });
  }

  sendMessage(type) {
    console.log('type: ', type);
    let data = {
      type: 'request',
      from: get(this.props,'userDetails.email',''),
      message: 'You have a request to host.',
    };
    console.log('sendMessage: ', data);
    socket.emit('sendMessage', {to: this.state.host, data: data});
  }

  sendAck(type) {
    console.log('type: ', type);
    let data = {
      type: 'acknowledge',
      from: get(this.props,'userDetails.email',''),
      message: 'You are being hosted.',
    };
    console.log('sendAck: ', data);
    socket.emit('sendMessage', {to: get(this.state,'to',''), data: data});
  }

  onMessageReceived(data) {
    if(data.type === 'request') {
      this.setState({
        to : data.from
      })
    }
    console.log('register a new message', data);
    this.setState({
      showCollaberateRequest: true,
      showMessage: data.message,
    });
  }

  toChangeHandler = (event) => {
    this.setState({ host: event.target.value });
  }

  render() {
    console.log('state--- ', this.state);
    return(
      <div className='collaborate-container'>
        <div className='collaborate-box'>
          <div className='collaborate-text'>Enter the email address of your host</div>
          <input
              className='collaborate-input'
              type='text'
              onChange={this.toChangeHandler}
          />
          <div>
            <Button className='collaborate-btn'
                  variant='contained'
                  color='primary'
                  onClick={() => this.sendMessage('request')}>
                  Send
            </Button>
          </div>
        </div>



        <div>
          blah
        {
          get(this.state,'showCollaberateRequest',false) ?
            <div onClick={() => this.sendAck('acknowledge')}>Request recieved</div> : ''
        }
        </div>
      </div>
    )
  }
}

export default DashboardNew;
