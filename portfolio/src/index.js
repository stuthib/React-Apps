import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Page from './components/Page/Page'
import * as serviceWorker from './serviceWorker'
import ReactGA from 'react-ga';

const trackingId = "UA-163683236-2";
ReactGA.initialize(trackingId);

ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
