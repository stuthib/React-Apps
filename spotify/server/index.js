/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
import credentials from './credentials.js';
const { get, has, forEach, keys, find, set } = require('lodash');
const PORT = process.env.PORT || 5000;

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
const path = require('path');

var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 5000);

var client_id = credentials.client_id;
var client_secret = credentials.client_secret;
var redirect_uri = credentials.redirect_uri;
let users = {};

var connectedUsers = {};


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app
  .use(express.static(path.join(__dirname, '../build')))
  .use(cookieParser())
  .use(cors());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/login', function(req, res) {
  console.log('/login');
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  console.log('COOKIE 1---', res);
  // your application requests authorization
  var scope = 'streaming user-read-private user-read-email user-follow-read user-top-read user-modify-playback-state user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    }));
});

app.get('/callback', function(req, res) {
  console.log('/callback');
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
        let user_details = {};

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          user_details['country'] = body['country'];
          user_details['images'] = body['images'];
          user_details['id'] = body['id'];
          user_details['uri'] = body['uri'];
          user_details['email'] = body['email'];
          console.log('USER DETAILS ', JSON.stringify(user_details));
          // we can also pass the token to the browser to make requests from there
          res.redirect('http://localhost:3000/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
              user_details: JSON.stringify(user_details),
            }));
        });
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('/collaberate', function(req, res) {
  let data = JSON.parse(req.query.data) || {};
  let id = data['host'];
  if(has(collaberateMap, id)) {
    let guests = collaberateMap[id];
    guests.push({'guest': data.guest,'guest_token': data.guest_access});
    collaberateMap[id] = guests;
  } else {
    collaberateMap[id] = [{'guest': data.guest,'guest_token': data.guest_access}]
  }
  console.log(collaberateMap);
  res.send({
    guest: data.guest,
    host: data.host,
  });
  res.end();
});

app.get('/acknowledge', function(req, res) {

});

app.get('/play', function(req, res) {
  let device_id = 'b6e63b4bc8ace7d51973e19c9a38d4f4657ccce5';
  let access_token = req.query.accessToken || '';
  var authOptions = {
    url: 'https://api.spotify.com/v1/me/player/play?device_id='+device_id,
    headers: { 'Authorization': 'Bearer ' + access_token },
    body: JSON.stringify({'context_uri': 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr'}),
    dataType: 'json'
  };

  request.put(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 204) {
      console.log('Success PLAY API.');
    } else {
      console.log('Error PLAY API: ', response.statusCode);
    }
    res.write('PLAY API : ' + (error ? 'error ' : 'success ') + response.statusCode);
    res.end();
  });
});

// function setupConnection() {
//
// }

io.on('connection', (socket) => {
  console.log('in on');
  socket.emit('to client', 'Hello Client!');
  socket.on('to server', (data) => {
    console.log(data);
  });
  socket.on('authenticatedUser', function(data, callback) {
    console.log('auth user--- ', data);
    let email = data.user.email;
    users[email] = {
      token : data.user.accessToken,
    }
    if(email in connectedUsers) {
      callback(false);
    } else {
      callback(true);
      socket.name = email;
      connectedUsers[socket.name] = socket;
    }
    console.log('--- users: ', users);
  });
  socket.on('sendMessage', function(data, callback) {
    //callback(data.message);
    console.log(data);
    if(has(connectedUsers, data.to)) {
      io.to(connectedUsers[data.to].emit('priv', data.data));
      //this.setupConnection();
    }
  });
});

//console.log('Listening on 8888');
//app.listen(8888);
