import React from 'react';
import { get } from 'lodash';
import Dashboard from '../Dashboard/Dashboard';
import LoginPage from './LoginPage';

/* Spotify API add-on */
import SpotifyWebApi from 'spotify-web-api-js';
/* Socket.io add-on */
import socketIOClient from "socket.io-client";

const spotifyApi = new SpotifyWebApi();
const hostURL = "http://localhost:5000";
const socket = socketIOClient(hostURL);

class Login extends React.Component {

  constructor(props) {
    super(props);
    let params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loginSuccess : token ? true : false,
      userDetails : JSON.parse(get(params,'user_details','{}')),
    };
  }

  componentDidMount() {
    socket.on('to client', (data) => {
      socket.emit('to server', 'Hello Server!');
      console.log(data);
    });
  }

  componentDidUnMount() {
    console.log('componentDidUnMount');
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    console.log(this.state);
    const { userDetails } = this.state;
    return(
      <div >
        {
          this.state.loginSuccess ?
            <Dashboard userDetails={userDetails}/> :
            <LoginPage />
        }
      </div>
    )
  }
}

export default Login;
