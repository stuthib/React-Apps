import React from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';
import { get, map } from 'lodash';
/* Spotify API add-on */
import SpotifyWebApi from 'spotify-web-api-js';
/* Socket.io add-on */
import socketIOClient from "socket.io-client";
const spotifyApi = new SpotifyWebApi();
const axios = require('axios');

const ENDPOINT = "http://localhost:5000";
const socket = socketIOClient(ENDPOINT);

function registerHandler(onMessageReceived) {
  //socket.on('message', onMessageReceived)
  socket.on('priv', onMessageReceived);
}

function unregisterHandler() {
  socket.off('priv');
}

class Dashboard extends React.Component {

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
    this.getDashboardData();
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

  getDashboardData() {
    spotifyApi.getMyDevices().then(
      (data) => {
        this.setState({
          devices: data.devices || [],
        })
      })
      .catch((error) => {
          console.log('Something went wrong..', error);
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

  play() {
    console.log('play clicked');
    axios.get('http://localhost:5000/play?accessToken='+spotifyApi.getAccessToken())
      .then((response) => {
        console.log('response: ', response);
      })
      .catch(function (error) {
        console.log('error: ', error);
    });
  }

  toChangeHandler = (event) => {
    this.setState({ host: event.target.value });
  }

  logout() {
    const url = 'https://www.spotify.com/logout/'
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
    setTimeout(() =>
    {
      spotifyLogoutWindow.close();
      window.location = 'http://localhost:5000';
    },
    2000);
  }

  render() {
    console.log('state--- ', this.state);
    return(
      <div className='dashboard-container'>
        <span>Collaberate with: </span>
        <input
            type='text'
            onChange={this.toChangeHandler}
        />
        <div onClick={() => this.sendMessage('request')}>
          Collaberate
        </div>
        <div onClick={() => this.play()}>
          Play
        </div>
        <div>
          blah
        {
          get(this.state,'showCollaberateRequest',false) ?
            <div onClick={() => this.sendAck('acknowledge')}>Request recieved</div> : ''
        }
        </div>
        <Button className='login-btn'
                variant='contained'
                color='primary'
                onClick={() => this.logout()}>
          Logout
        </Button>
      </div>
    )
  }
}

export default Dashboard;
