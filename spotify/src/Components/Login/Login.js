import React, { useEffect, useState } from 'react';
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

function Login() {

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    socket.on('to client', (data) => {
      socket.emit('to server', 'Hello Server!');
    });
    let params = getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    setLoginSuccess(token);
    setUserDetails(JSON.parse(get(params, 'user_details', '{}')));
  },[loginSuccess])

  const getHashParams = () => {
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

  return(
    <div >
      {
        loginSuccess ?
          <Dashboard userDetails={userDetails}/> :
          <LoginPage />
      }
    </div>
  )
}

export default Login;
