import React from 'react';
/* Spotify API add-on */
import SpotifyWebApi from 'spotify-web-api-js';
const axios = require('axios')
const spotifyApi = new SpotifyWebApi();

class Albums extends React.Component {

  componentDidMount() {
    axios.get('/allAlbums?accessToken='+spotifyApi.getAccessToken())
      .then((response) => {
        console.log('response: ', response);
      })
      .catch(function (error) {
        console.log('error: ', error);
    });
  }

  render() {
    return(
      <div>Albums</div>
    )
  }
}

export default Albums;
